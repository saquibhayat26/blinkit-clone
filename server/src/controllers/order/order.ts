import {
  Branch,
  Customer,
  DeliveryPartner,
  Order,
} from "../../models/index.js";

export const createOrder = async (req: any, reply: any) => {
  try {
    const { userId } = req.user;
    const { items, branch, totalPrice } = req.body;

    const customerData = await Customer.findById(userId);
    const branchData = await Branch.findById(branch);

    if (!customerData || !branchData) {
      return reply
        .status(404)
        .send({ message: "Customer or branch not found" });
    }

    const newOrder = new Order({
      customer: userId,
      products: items.map(
        (item: { id: string; item: string; quantity: number }) => ({
          id: item.id,
          item: item.item,
          quantity: item.quantity,
        })
      ),
      //   totalPrice: items.reduce(
      //     (total: number, item: { item: { price: number }; qauntity: number }) =>
      //       total + item.item.price * item.qauntity,
      //     0
      //   ),
      totalPrice,
      branch,
      deliveryLocation: {
        latitude: customerData.liveLocation.latitude,
        longitude: customerData.liveLocation.longitude,
        address: customerData.address || "No address provided",
      },
      pickupLocation: {
        latitude: branchData.location.latitude,
        longitude: branchData.location.longitude,
        address: branchData.address,
      },
      //   status: "pending",
    });
    const savedOrder = await newOrder.save();
    return reply
      .status(201)
      .send({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    return reply.status(500).send({ message: "Failed to create order", error });
  }
};

export const confirmOrder = async (req: any, reply: any) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.user;
    const { deliveryPersonLocation } = req.body;

    const deliveryPerson = await DeliveryPartner.findById(userId);
    if (!deliveryPerson) {
      return reply.status(404).send({ message: "Delivery person not found" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return reply.status(404).send({ message: "Order not found" });
    }
    if (order.status !== "available") {
      return reply.status(400).send({ message: "Order is not available" });
    }
    order.status = "confirmed";
    order.deliveryPartner = userId;
    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation?.latitude,
      longitude: deliveryPersonLocation?.longitude,
      address: deliveryPersonLocation?.address || "No address provided",
    };
    await order.save();
    return reply.status(200).send({ message: "Order confirmed", order });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to confirm order", error });
  }
};

export const updateOrderStatus = async (req: any, reply: any) => {
  try {
    const { orderId } = req.params;
    const { status, deliveryPersonLocation } = req.body;

    const { userId } = req.user;

    const deliveryPerson = await DeliveryPartner.findById(userId);
    if (!deliveryPerson) {
      return reply.status(404).send({ message: "Delivery person not found" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return reply.status(404).send({ message: "Order not found" });
    }
    if (["cancelled", "delivered"].includes(order.status)) {
      return reply.status(400).send({ message: "Order is not available" });
    }
    if (order.deliveryPartner.toString() !== userId) {
      return reply
        .status(400)
        .send({ message: "You are not authorized to update this order" });
    }

    order.status = status;
    order.deliveryPersonLocation = deliveryPersonLocation;
    await order.save();
    return reply.status(200).send({ message: "Order status updated", order });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to update order status", error });
  }
};

export const getOrders = async (req: any, reply: any) => {
  try {
    const { status, customerId, deliveryPartnerId, branchId } = req.query;

    let query: any = {};
    if (status) {
      query.status = status;
    }
    if (customerId) {
      query.customer = customerId;
    }
    if (deliveryPartnerId) {
      query.deliveryPartner = deliveryPartnerId;
      query.branch = branchId;
    }

    const orders = await Order.find(query).populate(
      "customer branch products.item deliveryPartner"
    );
    return reply
      .status(200)
      .send({ message: "order fetched successfully", orders });
  } catch (error) {
    return reply.status(500).send({ message: "Failed to get order", error });
  }
};

export const getOrderById = async (req: any, reply: any) => {
  try {
    const { orderId } = req.params;

    const orders = await Order.findById(orderId).populate(
      "customer branch products.item deliveryPartner"
    );
    if (!orders) {
      return reply.status(404).send({ message: "Order not found" });
    }
    return reply
      .status(200)
      .send({ message: "order fetched successfully", orders });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to retrieve order", error });
  }
};
