import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  RotateCcw,
  Sun,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DeploymentCard {
  id: string;
  title: string;
  label: string;
  description: string;
  outcome: string;
  accent: string;
  gradient: string;
  icon: LucideIcon;
}

interface CardStackProps {
  cards: DeploymentCard[];
  onActiveChange?: (card: DeploymentCard) => void;
}

export default function CardStack({ cards: initialCards, onActiveChange }: CardStackProps) {
  const [cards, setCards] = useState<DeploymentCard[]>(initialCards);
  const [isDark, setIsDark] = useState(false);
  const [dragDirection, setDragDirection] = useState<"up" | "down" | null>(null);

  const activeCard = cards[0];
  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [12, 0, -12]);

  const settings = useMemo(
    () => ({
      offset: 9,
      scaleStep: 0.055,
      dimStep: 0.13,
      swipeThreshold: 52,
      spring: {
        type: "spring" as const,
        stiffness: 170,
        damping: 26
      }
    }),
    []
  );

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  useEffect(() => {
    if (activeCard) {
      onActiveChange?.(activeCard);
    }
  }, [activeCard, onActiveChange]);

  const moveToEnd = () => {
    setCards((previous) => [...previous.slice(1), previous[0]]);
  };

  const moveToStart = () => {
    setCards((previous) => [previous[previous.length - 1], ...previous.slice(0, -1)]);
  };

  const resetCards = () => {
    setCards(initialCards);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number }; velocity: { y: number } }) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (Math.abs(offset) > settings.swipeThreshold || Math.abs(velocity) > 500) {
      if (offset < 0 || velocity < 0) {
        setDragDirection("up");
        window.setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection("down");
        window.setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }

    dragY.set(0);
  };

  const theme = {
    page: isDark
      ? "border-zinc-700 bg-zinc-950 text-zinc-50"
      : "border-zinc-200 bg-white text-zinc-950",
    muted: isDark ? "text-zinc-400" : "text-zinc-600",
    control: isDark
      ? "border-zinc-700 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800"
      : "border-zinc-200 bg-white/90 text-zinc-900 hover:bg-zinc-100",
    grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(24,24,27,0.08)",
    cardBorder: isDark ? "border-white/10" : "border-black/10"
  };

  return (
    <section className={cn("relative min-h-[620px] overflow-hidden rounded-lg border transition-colors", theme.page)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${theme.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.grid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="absolute left-5 right-5 top-5 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.button
            onClick={resetCards}
            className={cn("grid h-10 w-10 place-items-center rounded-full border backdrop-blur", theme.control)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Reset deck"
            type="button"
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        </div>

        <motion.button
          onClick={() => setIsDark((value) => !value)}
          className={cn("grid h-10 w-10 place-items-center rounded-full border backdrop-blur", theme.control)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Toggle theme"
          type="button"
        >
          {isDark ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5 text-zinc-700" />}
        </motion.button>
      </div>

      <motion.button
        onClick={moveToStart}
        className={cn("absolute left-5 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border backdrop-blur", theme.control)}
        whileHover={{ scale: 1.08, x: -3 }}
        whileTap={{ scale: 0.95 }}
        title="Previous card"
        type="button"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>

      <motion.button
        onClick={moveToEnd}
        className={cn("absolute right-5 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border backdrop-blur", theme.control)}
        whileHover={{ scale: 1.08, x: 3 }}
        whileTap={{ scale: 0.95 }}
        title="Next card"
        type="button"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>

      <div className="absolute left-1/2 top-20 z-20 flex -translate-x-1/2 gap-2">
        {initialCards.map((card) => (
          <button
            key={card.id}
            className={cn(
              "h-1.5 rounded-full transition-all",
              activeCard?.id === card.id ? "w-8" : "w-2",
              activeCard?.id === card.id ? "bg-emerald-500" : isDark ? "bg-zinc-700" : "bg-zinc-300"
            )}
            onClick={() => setCards((previous) => [...previous].sort((a, b) => (a.id === card.id ? -1 : b.id === card.id ? 1 : 0)))}
            title={card.title}
            type="button"
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-1/2 z-10 mx-auto h-[320px] w-[min(72vw,460px)] -translate-y-1/2 overflow-visible">
        <ul className="relative m-0 h-full w-full p-0">
          <AnimatePresence>
            {cards.map((card, index) => {
              const Icon = card.icon;
              const isFront = index === 0;
              const brightness = Math.max(0.36, 1 - index * settings.dimStep);
              const zIndex = cards.length - index;

              return (
                <motion.li
                  key={card.id}
                  className={cn("absolute h-full w-full list-none overflow-hidden rounded-lg border", theme.cardBorder)}
                  style={{
                    cursor: isFront ? "grab" : "auto",
                    touchAction: "none",
                    boxShadow: isFront
                      ? "0 28px 68px rgba(15, 23, 42, 0.22)"
                      : "0 16px 34px rgba(15, 23, 42, 0.14)",
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000
                  }}
                  animate={{
                    top: `${index * -settings.offset}%`,
                    scale: 1 - index * settings.scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex,
                    opacity: dragDirection && isFront ? 0 : 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.82,
                    transition: { duration: 0.2 }
                  }}
                  transition={settings.spring}
                  drag={isFront ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) {
                      dragY.set(info.offset.y);
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={isFront ? { zIndex: cards.length + 1, cursor: "grabbing", scale: 1.04 } : {}}
                >
                  <div className={cn("relative h-full w-full p-6 text-white", card.gradient)}>
                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute left-8 top-7 h-24 w-24 rounded-full border border-white/30" />
                      <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-white/20" />
                      <div className="absolute bottom-10 left-10 right-10 h-px bg-white/25" />
                      <div className="absolute bottom-16 left-16 right-16 h-px bg-white/15" />
                      <div className="absolute bottom-22 left-24 right-24 h-px bg-white/10" />
                    </div>

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{card.label}</p>
                          <h3 className="mt-3 max-w-[12ch] text-4xl font-semibold leading-none tracking-normal">{card.title}</h3>
                        </div>
                        <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/25 bg-white/15 backdrop-blur">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>

                      <div>
                        <p className="max-w-[34ch] text-sm leading-6 text-white/82">{card.description}</p>
                        <div className="mt-5 rounded-lg border border-white/20 bg-black/18 p-4 backdrop-blur">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Outcome</p>
                          <p className="mt-2 text-sm font-medium leading-5">{card.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      <div className={cn("absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between rounded-lg border px-4 py-3 backdrop-blur", isDark ? "border-zinc-700 bg-zinc-900/75" : "border-zinc-200 bg-white/75")}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">Active surface</p>
          <p className="mt-1 text-sm font-medium">{activeCard?.title}</p>
        </div>
        <p className={cn("hidden max-w-[22rem] text-right text-xs leading-5 sm:block", theme.muted)}>
          {activeCard?.outcome}
        </p>
      </div>
    </section>
  );
}
