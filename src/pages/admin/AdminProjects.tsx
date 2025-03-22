
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Edit, Trash, Plus, Search } from "lucide-react";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Project, projects as projectsData } from "@/data/projects";

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Filter projects by search query
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle project visibility
  const toggleVisibility = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, visible: !project.visible } : project
      )
    );
  };
  
  // Open edit modal
  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setShowEditModal(true);
  };
  
  // Open delete modal
  const openDeleteModal = (project: Project) => {
    setCurrentProject(project);
    setShowDeleteModal(true);
  };
  
  // Delete project
  const deleteProject = () => {
    if (!currentProject) return;
    setProjects(projects.filter((project) => project.id !== currentProject.id));
    setShowDeleteModal(false);
    setCurrentProject(null);
  };
  
  return (
    <div>
      <ScrollAnimator>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Projetos</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Projeto
          </button>
        </div>
      </ScrollAnimator>
      
      {/* Search Bar */}
      <ScrollAnimator className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </ScrollAnimator>
      
      {/* Projects Table */}
      <ScrollAnimator>
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/30 text-left">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Projeto</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Tags</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Visualizações</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredProjects.map((project) => (
                  <motion.tr 
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-10 h-10 rounded-md object-cover mr-3" 
                        />
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.visible 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}>
                        {project.visible ? "Visível" : "Oculto"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{project.views}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleVisibility(project.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          aria-label={project.visible ? "Ocultar projeto" : "Tornar projeto visível"}
                        >
                          {project.visible ? (
                            <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          aria-label="Editar projeto"
                        >
                          <Edit className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(project)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          aria-label="Excluir projeto"
                        >
                          <Trash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Tente ajustar sua busca ou adicione um novo projeto.
              </p>
            </div>
          )}
        </div>
      </ScrollAnimator>
      
      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4">Excluir Projeto</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Tem certeza que deseja excluir o projeto "{currentProject.title}"? Esta ação não pode ser desfeita.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteProject}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProjects;
