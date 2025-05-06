// homepageData.ts
import {
  TrendingUp,
  ShieldCheck,
  Clock,
  Code,
  ClipboardCheck,
  Layout,
  Rocket,
} from "lucide-react";
import colors from "../styles/colors";

export const defaultFeatures = [
  {
    title: "Leads That Actually Convert",
    description:
      "No fluff\u2014just high-quality leads ready to buy. Delivered through proven funnels and laser-focused targeting.",
    icon: <TrendingUp size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Your Funnel, Optimized End-to-End",
    description:
      "We audit, test, and upgrade every step of your buyer journey to unlock serious ROI.",
    icon: <ShieldCheck size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Sales on Autopilot",
    description:
      "Automated systems follow up, qualify, and close leads\u2014so you can focus on delivering, not chasing.",
    icon: <Clock size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "We Let Data Drive the Growth",
    description:
      "No guessing. Every campaign is tracked, tweaked, and scaled based on real numbers.",
    icon: <Code size={36} style={{ color: colors.primary }} />,
  },
];

export const defaultProcessSteps = [
  {
    title: "Kickoff & Strategy Call",
    description:
      "We get crystal-clear on your goals, bottlenecks, and growth levers in a fast-paced strategy session.",
    icon: <ClipboardCheck size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Custom Growth Blueprint",
    description:
      "We map out a high-leverage plan across traffic, conversion, and automation tailored to your business.",
    icon: <Layout size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Launch & Go Live",
    description:
      "We bring the plan to life\u2014building and launching high-converting campaigns fast.",
    icon: <Rocket size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Optimize & Scale",
    description:
      "We double down on what\u2019s working, cut what\u2019s not, and scale with confidence.",
    icon: <ShieldCheck size={36} style={{ color: colors.primary }} />,
  },
];

export const defaultFAQs = [
  {
    question: "What kind of results can I expect?",
    answer:
      "Every business is different\u2014but most of our clients start seeing a measurable boost in leads or sales within 30\u201345 days.",
  },
  {
    question: "What services do you actually provide?",
    answer:
      "We\u2019re your growth partner\u2014from lead gen and paid ads to funnel builds, automation, SEO, and CRO. If it drives revenue, we do it.",
  },
  {
    question: "Will this work for my business?",
    answer:
      "If you sell something valuable and know your market\u2014we\u2019ll make it work. We specialize in B2B, service-based, and expert businesses.",
  },
  {
    question: "Do I need a big budget?",
    answer:
      "Nope. We\u2019ll tailor your plan based on your budget and ROI goals. You can start lean and scale once it\u2019s working.",
  },
  {
    question: "What\u2019s the commitment?",
    answer:
      "No long-term contracts. Most clients start with a 90-day sprint. If you\u2019re happy, we scale. If not, you walk away.",
  },
  {
    question: "How do I know it\u2019s working?",
    answer:
      "You\u2019ll see the numbers\u2014leads, cost per acquisition, ROI. We send reports you\u2019ll actually understand (and care about).",
  },
];
