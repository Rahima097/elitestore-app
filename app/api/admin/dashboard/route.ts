import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { getDashboardStats, getRecentOrders, getTopProducts } from "@/lib/db-operations"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [stats, recentOrders, topProducts] = await Promise.all([
      getDashboardStats(),
      getRecentOrders(5),
      getTopProducts(5),
    ])

    return NextResponse.json({
      stats,
      recentOrders,
      topProducts,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
