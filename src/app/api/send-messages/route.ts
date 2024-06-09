import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user";
import { Message } from "@/model/user";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User not accepting messages",
        },
        { status: 403 }
      );
    }

    console.log(user);

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as unknown as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Message not sent", error);

    return Response.json(
      {
        success: false,
        message: "Message not sent",
      },
      { status: 500 }
    );
  }
}
