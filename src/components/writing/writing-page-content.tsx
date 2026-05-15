"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/mdx";
import { WritingCard } from "./writing-card";

const pageTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: pageTransition,
  },
};

type WritingPageContentProps = {
  backHome: string;
  description: string;
  empty: string;
  posts: PostMeta[];
  title: string;
};

export function WritingPageContent({
  backHome,
  description,
  empty,
  posts,
  title,
}: WritingPageContentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="site-container py-12"
    >
      <div className="mb-10 max-w-3xl">
        <motion.div variants={itemVariants}>
          <Button asChild variant="outline" size="sm" className="mb-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              {backHome}
            </Link>
          </Button>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg leading-8 text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>

      {posts.length === 0 ? (
        <motion.p variants={itemVariants} className="text-base text-slate-500">
          {empty}
        </motion.p>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid gap-5 md:grid-cols-3"
        >
          {posts.map((item) => (
            <motion.div key={item.slug} variants={itemVariants}>
              <WritingCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
