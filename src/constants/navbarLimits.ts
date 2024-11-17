import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  Settings2,
  GraduationCap,
  Home,
  DollarSign,
} from "lucide-react";

export const navbarItems = {
  navMain: [
    {
      title: "Home",
      url: "/tools/",
      icon: Home,
    },
    {
      title: "Paid Tools",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Chat GPT 4.0",
          url: "/tools/paid?type=gpt-4o",
        },
        {
          title: "Claude Sonnet 3.5",
          url: "/tools/paid?type=claude-sonnet-3.5",
        },
        {
          title: "Gemini PRO",
          url: "/tools/paid?type=gemini-pro",
        },
      ],
    },
    {
      title: "Chat Tools",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "AI Chatbot",
          url: "/tools/chat?type=default",
        },
        {
          title: "AI Personal Assistant",
          url: "/tools/chat?type=pa",
        },
        {
          title: "AI Explainer",
          url: "/tools/chat?type=explainer",
        },
        {
          title: "AI Coder",
          url: "/tools/chat?type=coder",
        },
      ],
    },
    {
      title: "Image Tools",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Text to Image",
          url: "/tools/text-to-image",
        },
      ],
    },
    {
      title: "Learner Tools",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "AI/GPT Detector",
          url: "/tools/ai-detector",
        },
        {
          title: "Paraphraser",
          url: "/tools/paraphraser",
        },
      ],
    },
    {
      title: "Other Tools",
      url: "",
      icon: Settings2,
      items: [
        {
          title: "AI Translation",
          url: "/tools/translator",
        },
        {
          title: "AI Summarizer",
          url: "/tools/summarizer",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};
