import OrderDetailsClient from "./OrderDetailsClient";

export const instant = false;

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderDetailsClient orderId={id} />;
}
