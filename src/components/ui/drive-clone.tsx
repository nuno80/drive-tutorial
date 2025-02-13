import { useState } from "react"
import { ChevronRight, Folder, File, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data structure
const mockData = {
  root: [
    {
      name: "Documents",
      type: "folder",
      children: [
        {
          name: "Work",
          type: "folder",
          children: [
            { name: "Project Proposal.docx", type: "file" },
            { name: "Budget.xlsx", type: "file" },
          ],
        },
        {
          name: "Personal",
          type: "folder",
          children: [
            { name: "Resume.pdf", type: "file" },
            { name: "Tax Return 2023.pdf", type: "file" },
          ],
        },
      ],
    },
    {
      name: "Photos",
      type: "folder",
      children: [
        {
          name: "Vacation",
          type: "folder",
          children: [
            { name: "Beach.jpg", type: "file" },
            { name: "Mountain.jpg", type: "file" },
          ],
        },
      ],
    },
    { name: "todo.txt", type: "file" },
  ],
}

type FileSystemItem = {
  name: string
  type: "file" | "folder"
  children?: FileSystemItem[]
}

export default function DriveClone() {
  const [currentPath, setCurrentPath] = useState(["root"])
  const [currentFolder, setCurrentFolder] = useState<FileSystemItem[]>(mockData["root"])

  const navigateToFolder = (folderName: string) => {
    const newPath = [...currentPath, folderName]
    setCurrentPath(newPath)
    const newFolder = getCurrentFolder(newPath)
    if (newFolder) {
      setCurrentFolder(newFolder)
    } else {
      console.error(`Folder not found: ${folderName}`)
    }
  }

  const navigateToBreadcrumb = (index: number) => {
    const newPath = currentPath.slice(0, index + 1)
    setCurrentPath(newPath)
    const newFolder = getCurrentFolder(newPath)
    if (newFolder) {
      setCurrentFolder(newFolder)
    } else {
      console.error(`Invalid path: ${newPath.join("/")}`)
    }
  }

  const getCurrentFolder = (path: string[]): FileSystemItem[] | null => {
    let folder: any = mockData
    for (let i = 0; i < path.length; i++) {
      if (i === 0 && path[i] === "root") {
        folder = mockData["root"]
      } else {
        if (!Array.isArray(folder)) return null
        const found = folder.find((item: FileSystemItem) => item.name === path[i] && item.type === "folder")
        if (!found) return null
        folder = found.children
      }
    }
    return Array.isArray(folder) ? folder : null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <nav className="text-sm breadcrumbs">
            <ul className="flex items-center space-x-2">
              {currentPath.map((folder, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                  <Button
                    variant="ghost"
                    className="hover:text-blue-400 transition-colors"
                    onClick={() => navigateToBreadcrumb(index)}
                  >
                    {folder === "root" ? "My Drive" : folder}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <Button className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Update</span>
          </Button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <ul className="divide-y divide-gray-700">
            {currentFolder.map((item: FileSystemItem, index: number) => (
              <li key={index} className="p-4 hover:bg-gray-700 transition-colors">
                {item.type === "folder" ? (
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start text-left"
                    onClick={() => navigateToFolder(item.name)}
                  >
                    <Folder className="w-5 h-5 mr-3 text-blue-400" />
                    {item.name}
                  </Button>
                ) : (
                  <a href="#" className="flex items-center text-gray-300 hover:text-white">
                    <File className="w-5 h-5 mr-3 text-gray-400" />
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

