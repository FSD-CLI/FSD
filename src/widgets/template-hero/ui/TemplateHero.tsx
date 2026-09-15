import { Badge } from "@/shared/ui";
import { templateInfo } from "@/shared/config";

export function TemplateHero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-16 lg:pt-16">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">React + Vite</Badge>
          <Badge tone="green">Feature-Sliced Design</Badge>
        </div>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {templateInfo.name}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            {templateInfo.intro}
          </p>
        </div>
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm shadow-xl shadow-slate-300/30 sm:max-w-xl">
          {templateInfo.commands.map((command) => (
            <code
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-slate-100"
              key={command}
            >
              {command}
            </code>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm font-semibold text-slate-900">src/</span>
          <span className="text-xs font-medium text-slate-500">FSD layers</span>
        </div>
        <div className="space-y-3 font-mono text-sm">
          {templateInfo.layers.map((layer) => (
            <div
              className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-slate-700"
              key={layer.name}
            >
              <span>{layer.name}/</span>
              <span className="text-xs text-slate-400">{layer.path}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
