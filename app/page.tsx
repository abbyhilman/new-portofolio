"use client"

import { useState, Suspense } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Smartphone,
  Code2,
  Star,
  ChevronDown,
  Briefcase,
  X,
  ExternalLink,
} from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import dynamic from "next/dynamic"

// Dynamically import the 3D components to avoid SSR issues
const ParticleField = dynamic(() => import("@/components/particle-field"), { ssr: false })
const FloatingPhone = dynamic(() => import("@/components/floating-phone"), { ssr: false })

interface FormData {
  senderEmail: string;
  subject: string;
  body: string;
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    senderEmail: '',
    subject: '',
    body: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani unduhan resume
  // const handleDownloadResume = () => {
  //   const link = document.createElement('a');
  //   link.href = '/abby-hilman-resume.pdf'; // Path ke file di folder public
  //   link.download = 'Abby_Hilman_Resume.pdf'; // Nama file saat diunduh
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailtoLink = `mailto:abbyhilman@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.body + '\n\nFrom: ' + formData.senderEmail)}`;
    window.location.href = mailtoLink;
    setIsModalOpen(false);
    setFormData({ senderEmail: '', subject: '', body: '' });
  };

  const projects = [
    {
      title: "Mednefits",
      description:
        "Mobile app for employee benefits in Southeast Asia. Access cashless healthcare, track claims, and manage coverage effortlessly.",
      image: "/logo-mednefits.png",
      tech: ["React Native", "Firebase", "Maps API"],
      features: [
        "Real-time carbon footprint calculation",
        "Eco-friendly product recommendations",
        "Community challenges and leaderboards",
        "Personalized sustainability tips",
      ],
      screenshots: [
        "/mednefits_satu.png",
        "/mednefist_dua.png",
        "/mednefist_tiga.png",
      ],
      client: "Mednefits PTE LTD",
    },
    {
      title: "MServiceDesk",
      description: "Digital service platform by Telkomsel’s SSOE and IT SQM. Streamlines IT and non-IT employee support with efficient tools.",
      image: "/logo-mservicedesk.png",
      tech: ["React Native", "Redux", ""],
      features: [
        "AI-powered workout recommendations",
        "Real-time heart rate monitoring",
        "Nutrition tracking and meal planning",
        "Progress visualization with charts",
        "Social sharing and challenges",
      ],
      screenshots: [
        "/msd_satu.png",
        "/msd_dua.png",
        "/msd_tiga.png",
      ],
      client: "Telkomsel",
    },
    {
      title: "Orange Planner",
      description: "Mobile app for insurance agents. Simplifies client data entry, e-submission, and policy tracking for Hanwha Life Indonesia.",
      image: "/logo-op.png",
      tech: ["Flutter", "Firebase", "GetX", "Push Notifications", "OCR", "Face Recognition"],
      features: [
        "Real-time price tracking for 1000+ cryptocurrencies",
        "Portfolio management with performance metrics",
        "Custom price alerts and notifications",
        "News aggregation from trusted sources",
        "Secure wallet integration",
      ],
      screenshots: [
        "orange_satu.png",
        "orange_dua.png",
        "orange_tiga.png",
      ],
      client: "Hanwha Life Insurance Indonesia",
    },
  ];

  const workExperience = [
    {
      company: "PT Hanwhalife Insurance Indonesia",
      position: "Senior Mobile Developer",
      duration: "2022 - Present",
      period: "2 years 10 months",
      description:
        "Implementing best practices, and delivering high-quality applications for enterprise clients.",
      tech: ["Flutter", "Firebase", 'Gitlab', 'CodeMagic'],
      achievements: [
        "Maintenance and Create Mobile Application (Android & iOS)",
        "Reduced app crash rate by 75% through implementing comprehensive testing",
        "Using firebase for crashlytics, analytic, push notification and then cloud firestore",
        "Create feature OCR, Face Recognition and Sign Digital",
        "Configuring CI/CD on CodeMagic",
        "Deployment to Playstore & Appstore"
      ],
    },
    {
      company: "PT. Astra Graphia Information Technology (AGIT)",
      position: "Mobile Developer",
      duration: "Jan 2021 - Jun 2022",
      period: "1 year 6 months",
      description:
        "Developed and maintained multiple mobile applications, focusing on performance optimization and user experience.",
      tech: ["React Native", "Firebase", "Redux", "App Center", "Fastlane"],
      achievements: [
        "Optimized app performance resulting in 40% faster load times",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Contributed to open-source React Native libraries",
      ],
    },
    {
      company: "Mednefits PTE LTD",
      position: "Mobile Developer",
      duration: "Apr 2020 - Dec 2020",
      period: "9 months",
      description: "Collaborated on mobile app development projects and gained expertise in modern mobile frameworks.",
      tech: ["React Native", "Redux", "Firebase", "ClickUp"],
      achievements: [
        "Implement scanning camera for detect QR Code for payment e-wallet",
        "Implement google maps for detect nearby radius clini",
        "Created reusable component library for faster development",
      ],
    },
    {
      company: "GenIO",
      position: "Mobile Developer Intern",
      duration: "2019",
      period: "3 months",
      description: "Assisted in mobile app development and learned industry best practices.",
      tech: ["React Native"],
      achievements: [
        "Contributed to UI development for a ecommerce app",
      ],
    },
  ]

  const freelanceProjects = [
    {
      title: "Website Portal",
      client: "DPMPTSP Tangerang Selatan",
      duration: "Complete",
      description:
        "Performed maintenance and enhancements for the official DPMPTSP Tangerang Selatan portal, improving accessibility and reliability of public licensing services.",
      tech: ["Vue JS"],
      image:
        "/dpmptsp_satu.png",
      features: [
        "Optimized website performance for faster access to licensing services",
        "Implemented real-time status tracking for permit applications",
        "Integrated secure user authentication and data management",
        "Ensured compliance with government security and accessibility standards",
      ],
      screenshots: [
        "/dpmptsp_satu.png",
        "/dpmptsp_dua.png",
      ],
      appLink: "https://dpmptsp.tangerangselatankota.go.id/portal",
    },
    {
      title: "Yadara Travel",
      client: "Travel Agency",
      duration: "Completed",
      description:
        "Developed a comprehensive mobile application for managing Umrah and Hajj travel packages, including booking system and travel guidance.",
      tech: ["Flutter", "Firebase", "Google Maps API", "CMS", "Payment Gateway"],
      image:
        "https://gcdnb.pbrd.co/images/8ZJqwTzasKwh.png?o=1",
      features: [
        "Real-time prayer times and Qibla direction",
        "Interactive maps of holy sites",
        "Package booking and management system",
        "Become a travel agent with easy registration and management tools",
        "Earn commissions on every booking made through the app"
      ],
      screenshots: [
        "https://gcdnb.pbrd.co/images/TvQg9RwuU60z.jpg?o=1",
        "https://gcdnb.pbrd.co/images/BPmZEXs3AfXb.jpg?o=1",
        "https://gcdnb.pbrd.co/images/o5fpbmy5uzEJ.jpg?o=1",
      ],
      appLink: "https://yadaratravel.id/",
    },
  ]

  const skills = [
    { category: "Mobile", items: ["React Native", "Flutter", "Kotlin", "Expo"] },
    { category: "Frontend", items: ["React", "Next JS", "Vue JS", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Firebase", "MongoDB", "Laravel", "PHP", "REST API"] },
    { category: "Tools", items: ["Git", "CI/CD", "Fastlane", "CodeMagic", "CodePush", "Figma"] },
  ]

  const ProjectModal = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-2xl font-bold dark:text-white">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-lg mb-2 dark:text-white">Client</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.client}</p>

              <h4 className="font-semibold text-lg mb-2 dark:text-white">Description</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

              <h4 className="font-semibold text-lg mb-2 dark:text-white">Technologies</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 dark:text-white">Key Features</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <h4 className="font-semibold text-lg mb-4 dark:text-white">Screenshots</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                className="relative aspect-[9/16] rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={screenshot || "/placeholder.svg"}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" style={{ scaleX }} />

      {/* Hero Section with 3D Particles */}
      <section className="h-screen relative overflow-hidden">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <ParticleField count={2000} />
              <FloatingPhone position={[2, -0.5, 0]} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80 mix-blend-multiply" />

          <div className="max-w-4xl mx-auto px-4 text-center relative text-white">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
            >
              Abby Hilman
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.4,
              }}
            >
              Mobile Apps Developer
            </motion.h2>
            <motion.div
              className="flex gap-6 justify-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="https://github.com/abbyhilman"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub Profile"
              >
                <Github size={28} />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/abby-hilman-696479152/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={28} />
              </motion.a>

              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="hover:text-blue-200 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Send Email"
              >
                <Mail size={28} />
              </motion.a>
            </motion.div>

            <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium flex items-center mx-auto hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="mr-2 h-5 w-5" />
                Hire Me
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        className="py-32 px-4 relative overflow-hidden dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="max-w-4xl mx-auto relative">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                Passionate mobile developer with 4+ years of experience in creating innovative and user-friendly
                applications. Specialized in React Native and Flutter development, with a strong focus on clean code and
                optimal performance.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                I've worked with startups, consultants, medical payment, and insurance industries, delivering solutions that
                combine technical excellence with exceptional user experiences.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold mb-4 text-xl dark:text-white">Tech Stack:</h3>
                <div className="flex flex-wrap gap-3">
                  {["React Native", "Flutter", "TypeScript", "Firebase", "Redux", "Next JS"].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full text-sm dark:text-gray-200"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Smartphone, title: "Mobile Apps", value: "3+ Released" },
                { icon: Code2, title: "Experience", value: "4+ Years" },
                { icon: Star, title: "App Rating", value: "4.8/5.0" },
                {
                  icon: ExternalLink,
                  title: "App Downloads",
                  value: "500K+",
                  onClick: () => setIsDownloadModalOpen(true) // Tambahkan onClick untuk modal
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  onClick={stat.onClick} // Tambahkan handler klik
                >
                  <stat.icon className="text-blue-600 dark:text-blue-400 mb-4 w-8 h-8" />
                  <h3 className="font-semibold text-lg mb-2 dark:text-white">{stat.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="py-32 px-4 bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.category}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm shadow-sm dark:text-gray-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: "#3b82f6", color: "#ffffff" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        className="py-32 px-4 bg-gray-50 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Work Experience
          </motion.h2>

          <div className="space-y-12">
            {workExperience.map((job, index) => (
              <motion.div
                key={job.company}
                className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full" />
                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.position}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{job.company}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-gray-600 dark:text-gray-300">{job.duration}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.period}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{job.description}</p>

                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Freelance Projects */}
          <motion.div className="mt-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-8 text-center dark:text-white">Freelance Projects</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {freelanceProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Briefcase className="text-blue-600 dark:text-blue-400 w-6 h-6 mr-3" />
                      <div>
                        <h4 className="text-lg font-semibold dark:text-white">{project.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{project.client}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.appLink && (
                      <motion.a
                        href={project.appLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View App
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section className="py-32 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Company Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                <motion.div
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <motion.section
        className="py-32 px-4 relative overflow-hidden dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h2
            className="text-4xl font-bold mb-8 dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Hire Me
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Interested in working together? Feel free to reach out!
          </motion.p>
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="inline-block bg-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </motion.section> */}

      {/* Email Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">Send Email</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 dark:text-gray-300">Your Email</label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 dark:text-gray-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Message Subject"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 dark:text-gray-300">Message</label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                    placeholder="Your message here..."
                    required
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Apps Modal */}
      <AnimatePresence>
        {isDownloadModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Select App to Download</h2>
              <div className="space-y-4">
                <a
                  href="https://m.helpdesk-web.telkomsel.co.id/landingpage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  onClick={() => setIsDownloadModalOpen(false)}
                >
                  <img
                    src="/logo-mservicedesk.png"
                    alt="Mobile Service Desk"
                    className="w-12 h-12 object-contain rounded-md"
                  />
                  <span className="text-gray-800 dark:text-white font-medium">Mobile Service Desk</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=co.id.hanwhalife.agencymobile&hl=es_US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  onClick={() => setIsDownloadModalOpen(false)}
                >
                  <img
                    src="/logo-op.png"
                    alt="Orange Planner"
                    className="w-12 h-12 object-contain rounded-md"
                  />
                  <span className="text-gray-800 dark:text-white font-medium">Orange Planner</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sg.medicloud&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  onClick={() => setIsDownloadModalOpen(false)}
                >
                  <img
                    src="/logo-mednefits.png"
                    alt="Mednefits"
                    className="w-12 h-12 object-contain rounded-md"
                  />
                  <span className="text-gray-800 dark:text-white font-medium">Mednefits</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                className="mt-6 w-full bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </div>
  )
}

