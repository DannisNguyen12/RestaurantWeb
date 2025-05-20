import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@repo/database/generated/prisma';

export async function POST(req: NextRequest) {
  try {
    const { cart } = await req.json();
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    // Mock customer name and table number for demo
    const customerName = "Guest";
    const tableNumber = 1;
    const total = cart.reduce((sum: number, item: any) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);

    const prisma = new PrismaClient();
    // Create order
    const order = await prisma.order.create({
      data: {
        customerName,
        tableNumber,
        total,
        status: "PENDING",
        items: {
          create: cart.map((item: any) => ({
            item: { connect: { id: item.id } },
            quantity: item.quantity || 1,
          })),
        },
      },
      include: { items: true },
    });

    // Mock payment: always succeed after short delay
    await new Promise(res => setTimeout(res, 1000));

    // Update order status to COMPLETED
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "COMPLETED" },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: "Payment or order creation failed." }, { status: 500 });
  }
}
