import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { createOrder, getOrdersByUserId } from "@/lib/db-operations"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const orders = await getOrdersByUserId(session.user.id, { limit, skip })

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        hasMore: orders.length === limit,
      },
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderData = await request.json()

    // Validate required fields
    const requiredFields = ["items", "shippingAddress", "paymentMethod", "subtotal", "tax", "shipping", "total"]
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const order = {
      ...orderData,
      userId: new ObjectId(session.user.id),
      status: "pending" as const,
    }

    const newOrder = await createOrder(order)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
