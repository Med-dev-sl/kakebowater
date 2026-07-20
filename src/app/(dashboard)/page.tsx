import dynamic from "next/dynamic";
import Container from "@/components/container";

const Metrics = dynamic(
  () => import("@/components/chart-blocks").then((m) => ({ default: m.Metrics })),
  { loading: () => <ChartSkeleton className="h-52" />, ssr: true },
);

const AverageTicketsCreated = dynamic(
  () =>
    import("@/components/chart-blocks").then((m) => ({
      default: m.AverageTicketsCreated,
    })),
  { loading: () => <ChartSkeleton className="h-96" />, ssr: true },
);

const Conversions = dynamic(
  () =>
    import("@/components/chart-blocks").then((m) => ({
      default: m.Conversions,
    })),
  { loading: () => <ChartSkeleton className="h-72" />, ssr: true },
);

const TicketByChannels = dynamic(
  () =>
    import("@/components/chart-blocks").then((m) => ({
      default: m.TicketByChannels,
    })),
  { loading: () => <ChartSkeleton className="h-96" />, ssr: true },
);

const CustomerSatisfaction = dynamic(
  () =>
    import("@/components/chart-blocks").then((m) => ({
      default: m.CustomerSatisfaction,
    })),
  { loading: () => <ChartSkeleton className="h-72" />, ssr: true },
);

function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted ${className ?? "h-64"}`}
    />
  );
}

export default function Home() {
  return (
    <Container className="flex flex-col gap-6 py-4">
      <Metrics />

      <div className="grid grid-cols-1 gap-6 laptop:grid-cols-2">
        <AverageTicketsCreated />
        <TicketByChannels />
      </div>

      <div className="grid grid-cols-1 gap-6 laptop:grid-cols-2">
        <Conversions />
        <CustomerSatisfaction />
      </div>
    </Container>
  );
}
