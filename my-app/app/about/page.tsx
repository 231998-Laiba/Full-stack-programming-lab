export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          This application was created as part of Lab 08 for the Full Stack Programming course
          (BSSE-VI) at Air University, Islamabad. It demonstrates how to build a multi-page
          Next.js app with shared layout components.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Tech Stack</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Node.js"].map((tech) => (
            <span
              key={tech}
              className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">Instructor</h2>
        <p className="text-gray-600">Mr. Sharif Hussain</p>
      </div>
    </div>
  );
}