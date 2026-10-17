import { useId, useState } from 'react';
import { ChevronDown, ExternalLink, PlayCircle, Search } from 'lucide-react';

interface Props {
  videoId?: string;
  searchQuery: string;
  title?: string;
}

const searchUrl = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query).replace(/%20/g, '+')}`;

export default function VideoTutorialEmbed({ videoId, searchQuery, title = 'Watercolor tutorial' }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      className="mb-8 rounded-2xl border border-terracotta-200 bg-white shadow-soft"
      data-html2canvas-ignore
    >
      <h2 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left font-serif text-lg text-sage-800 transition-colors hover:bg-terracotta-50"
        >
          <span className="flex items-center gap-2">
            <PlayCircle size={22} className="text-terracotta-600" aria-hidden /> Watch Video Demonstration
          </span>
          <ChevronDown size={20} aria-hidden className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      <div id={panelId} hidden={!open} className="px-5 pb-5">
        {open &&
          (videoId ? (
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-stone-100">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title={title}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href={searchUrl(searchQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-dashed border-terracotta-300 bg-terracotta-50 p-5 transition-colors hover:bg-terracotta-100"
            >
              <Search size={28} className="shrink-0 text-terracotta-600" aria-hidden />
              <span className="flex-1">
                <span className="block font-medium text-sage-800">Find on YouTube</span>
                <span className="text-sm">Search for “{searchQuery}” in a new tab.</span>
              </span>
              <ExternalLink size={18} aria-hidden className="shrink-0 text-terracotta-700" />
            </a>
          ))}
      </div>
    </section>
  );
}
