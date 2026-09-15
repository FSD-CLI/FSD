import { Badge, Card } from "@/shared/ui";
import { templateInfo } from "@/shared/config";

export function TemplateStructure() {
  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-5 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="bg-slate-950 text-white">
        <Badge tone="green">Where to edit</Badge>
        <h2 className="mt-4 text-2xl font-bold">Build from the pages layer</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Replace this welcome page from <code>src/pages/welcome</code>, then
          compose real screens with widgets, features, entities, and shared UI.
        </p>
        <div className="mt-6 grid gap-3">
          {templateInfo.actions.map((action) => (
            <div
              className="rounded-md border border-white/10 bg-white/5 p-4"
              key={action.title}
            >
              <h3 className="text-sm font-semibold text-white">{action.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {action.description}
              </p>
              <code className="mt-3 block text-xs text-emerald-200">
                {action.path}
              </code>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Dummy data
          </p>
          <h2 className="text-2xl font-bold text-slate-950">
            Typed config drives this page
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            The welcome content comes from a small shared config file. It is a
            simple example of typed data usage without API calls or business
            logic.
          </p>
        </div>
        <div className="grid gap-3">
          {templateInfo.layers.map((layer) => (
            <Card key={layer.name}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-mono text-sm font-semibold text-slate-950">
                  {layer.name}/
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {layer.path}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {layer.purpose}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
