'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PresentationIcon, MessageSquareIcon, GlobeIcon, BrainIcon, SparklesIcon, CodeIcon, PenToolIcon, MusicIcon } from "lucide-react"


export default function page() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-grid-pattern">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 z-50">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
                  Unleash the Power of AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-500">
                  LetAIHelp provides you AI tools that helps boost your productivity and enhance creativity.
                </p>
              </div>
              <LinkButton name = "Get Started"/>
            </div>
          </div>
        </section>
      
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">Our AI Tools</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                { icon: PresentationIcon, title: "AI Presentation Maker", description: "Create stunning presentations in minutes with our AI-powered tool." },
                { icon: MessageSquareIcon, title: "AI Chat Assistant", description: "Get instant answers and assistance with our advanced AI chatbot." },
                { icon: GlobeIcon, title: "AI Translation", description: "Break language barriers with our accurate AI-powered translation tool." },
                { icon: BrainIcon, title: "AI Content Generator", description: "Generate high-quality content for blogs, social media, and more." },
                { icon: SparklesIcon, title: "AI Image Enhancement", description: "Enhance and upscale your images with our AI-powered tool." },
                { icon: CodeIcon, title: "AI Code Assistant", description: "Get help with coding tasks and debugging from our AI." },
                { icon: PenToolIcon, title: "AI Design Helper", description: "Create beautiful designs with AI-powered suggestions and tools." },
                { icon: MusicIcon, title: "AI Music Composer", description: "Compose original music tracks with our AI music generator." }
              ].map((tool, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <tool.icon className="h-12 w-12 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tool.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
                  Ready to Let AI Help?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of users who are already benefiting from our AI-powered tools.
                </p>
              </div>
              <LinkButton name = "Get Started"/>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 LetAIHelp. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}


const LinkButton = ({name , href = "/sign-in"} : {name: string , href?: string}) => {
  return (
    <Link href={href} className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-sm p-2 rounded-md cursor-pointer z-10">
      {name}
    </Link>
  )
}
