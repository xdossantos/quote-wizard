import PayQuote from "../../../../components/pay-quote";

export default async function PayQuotePage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return <PayQuote uuid={uuid} />;
}
