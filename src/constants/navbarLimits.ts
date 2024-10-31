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
      url: "/dashboard/",
      icon: Home,
    },
    {
      title: "Paid Tools",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Chat GPT 4.0",
          url: "/dashboard/paid?type=gpt-4o",
        },
        {
          title: "Claude Sonnet 3.5",
          url: "/dashboard/paid?type=claude-sonnet-3.5",
        },
        {
          title: "Gemini PRO",
          url: "/dashboard/paid?type=gemini-pro",
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
          url: "/dashboard/chat?type=default",
        },
        {
          title: "AI Personal Assistant",
          url: "/dashboard/chat?type=pa",
        },
        {
          title: "AI Explainer",
          url: "/dashboard/chat?type=explainer",
        },
        {
          title: "AI Coder",
          url: "/dashboard/chat?type=coder",
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
          url: "/dashboard/text-to-image",
        },
      ],
    },
    {
      title: "Leaner Tools",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "AI/GPT Detector",
          url: "/dashboard/ai-detector",
        },
        {
          title: "Paraphraser",
          url: "/dashboard/paraphraser",
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
          url: "/dashboard/translator",
        },
        {
          title: "AI Summarizer",
          url: "/dashboard/summarizer",
        },
        {
          title: "Object Recognition",
          url: "/dashboard/object-recognition",
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
