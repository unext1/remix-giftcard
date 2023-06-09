import type { V2_MetaFunction } from "@remix-run/node";
import { Alert } from "~/components/ui/alert";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="space-y-4 container mx-auto space-x-4">
      <h1 className="text-7xl">hi</h1>
      <button className="btn">Button</button>
      <button className="btn btn-primary">Button</button>
      <button className="btn btn-secondary">Button</button>
      <button className="btn btn-warning">Button</button>
      <Alert>Alert</Alert>
    </div>
  );
}
