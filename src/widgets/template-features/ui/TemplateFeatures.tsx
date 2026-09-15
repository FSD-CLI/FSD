import { Card } from "@/shared/ui";
import { templateInfo } from "@/shared/config";

export function TemplateFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Included
          </p>
          <h2 className="text-2xl font-bold text-slate-950">Starter features</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          Tooling is already wired so you can focus on the project structure and
          your first real slice.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {templateInfo.features.map((feature) => (
          <Card key={feature.title}>
            <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-blue-50 text-sm font-bold text-blue-700">
              {feature.title.slice(0, 2)}
            </div>
            <h3 className="text-base font-semibold text-slate-950">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
