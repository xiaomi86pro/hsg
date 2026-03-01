"use client"

import Link from "next/link"

export default function TeacherDashboardPage() {
  const actions = [
    {
      title: "Import Passage",
      description:
        "Import reading/listening passage with questions from Excel file.",
      href: "/teacher/question-bank/import",
    },
    {
      title: "Question Bank",
      description:
        "Browse, filter and manage existing questions.",
      href: "/teacher/question-bank",
    },
    {
      title: "Exam Templates",
      description:
        "Create and manage exam templates and structure.",
      href: "/teacher/templates",
    },
    {
      title: "Student Reports",
      description:
        "View student performance and exam statistics.",
      href: "/teacher/reports",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          Teacher Dashboard
        </h1>
        <p className="text-gray-600">
          Manage question bank, templates, and student exams.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="border rounded-xl p-6 hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">
              {action.title}
            </h2>
            <p className="text-sm text-gray-600">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}