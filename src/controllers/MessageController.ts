import { Request, Response } from "express";
import { MessageModel } from "../db/message";
import { messageSchema } from "../_helpers/validators";

class MessageController {
  public async getAllMessages(request: Request, response: Response) {
    try {
      const messages = await MessageModel.find()
        .sort({ createdAt: -1 })
        .populate("to", "_id name email")
        .populate("sender", "_id name email");
      return response.status(201).json({ data: messages });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async getMessage(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const message = await MessageModel.findById(id);
      return response.status(201).json({ data: message });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async getMessageByUserId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const message = await MessageModel.find({
        $or: [{ to: id }, { sender: id }],
      })
        .sort({ createdAt: -1 })
        .populate("to", "_id name email")
        .populate("sender", "_id name email");;
      return response.status(201).json({ data: message });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async createMessage(request: Request, response: Response) {
    try {
      const { to, sender, subject, body } = request.body;
      messageSchema.parse({ to, sender, subject, body });

      const message = new MessageModel({
        to,
        sender,
        subject,
        body,
        status: 1,
      });

      await message.save();

      return response
        .status(201)
        .json({ message: "Message created", data: message });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async readMessage(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const message = await MessageModel.findById(id);
      if(message){
        message.status = 2;
        await message.save();
        return response.status(201).json({ data: message });
      }
      return response.status(400).json({ message: "Message not found" });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }

  public async deleteMessage(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const message = await MessageModel.findById(id);
      if(message){
        message.status = 3;
        await message.save();
        return response.status(201).json({ data: message });
      }
      return response.status(400).json({ message: "Message not found" });
    } catch (error) {
      return response.status(400).json({ status: false, error });
    }
  }
  
}
export default new MessageController();
