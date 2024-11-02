import { Customer, DeliveryPartner } from "../../models/index.js";

export const updateUser = async (req: any, reply: any) => {
  const { userId } = req.user;
  const updateData = req.body;
  try {
    let user =
      (await Customer.findById(userId)) ||
      (await DeliveryPartner.findById(userId));

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }
    let UserModel;
    if (user.role === "Customer") {
      UserModel = Customer;
    } else if (user.role === "DeliveryPartner") {
      UserModel = DeliveryPartner;
    } else {
      return reply.status(400).send({ message: "Invalid User Role" });
    }
    const updatedUser = await (UserModel as any).findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
