
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Edit, Trash, Plus, Search, X, Check } from "lucide-react";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Project, projects as projectsData } from "@/data/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "https://placehold.co/600x400/png",
    tags: [],
    featured: false,
    visible: true,
    views: 0,
  });
  const [newTag, setNewTag] = useState("");
  
  const { toast } = useToast();

  // Filter projects by search query
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle project visibility
  const toggleVisibility = (id: string) => {
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          const updatedProject = { ...project, visible: !project.visible };
          toast({
            title: updatedProject.visible ? "Projeto visível" : "Projeto oculto",
            description: `O projeto "${project.title}" foi ${updatedProject.visible ? "tornado visível" : "ocultado"}.`,
          });
          return updatedProject;
        }
        return project;
      })
    );
  };
  
  // Open add modal
  const openAddModal = () => {
    setNewProject({
      title: "",
      description: "",
      image: "https://placehold.co/600x400/png",
      tags: [],
      featured: false,
      visible: true,
      views: 0,
    });
    setShowAddModal(true);
  };
  
  // Open edit modal
  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setNewProject({...project});
    setShowEditModal(true);
  };
  
  // Open delete modal
  const openDeleteModal = (project: Project) => {
    setCurrentProject(project);
    setShowDeleteModal(true);
  };
  
  // Add tag to project
  const addTag = () => {
    if (newTag.trim() && !newProject.tags?.includes(newTag.trim())) {
      setNewProject({
        ...newProject,
        tags: [...(newProject.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };
  
  // Remove tag from project
  const removeTag = (tag: string) => {
    setNewProject({
      ...newProject,
      tags: newProject.tags?.filter((t) => t !== tag),
    });
  };
  
  // Add new project
  const addProject = () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    const id = newProject.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
      
    const date = new Date().toISOString().split("T")[0];
    
    const projectToAdd: Project = {
      id,
      title: newProject.title || "",
      description: newProject.description || "",
      image: newProject.image || "https://placehold.co/600x400/png",
      date,
      tags: newProject.tags || [],
      featured: newProject.featured || false,
      visible: newProject.visible || true,
      views: 0,
    };
    
    setProjects([projectToAdd, ...projects]);
    setShowAddModal(false);
    
    toast({
      title: "Projeto adicionado",
      description: `O projeto "${projectToAdd.title}" foi adicionado com sucesso.`,
    });
  };
  
  // Update project
  const updateProject = () => {
    if (!currentProject || !newProject.title || !newProject.description) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setProjects(
      projects.map((project) => {
        if (project.id === currentProject.id) {
          const updatedProject = {
            ...project,
            title: newProject.title || project.title,
            description: newProject.description || project.description,
            image: newProject.image || project.image,
            tags: newProject.tags || project.tags,
            featured: newProject.featured ?? project.featured,
            visible: newProject.visible ?? project.visible,
          };
          return updatedProject;
        }
        return project;
      })
    );
    
    setShowEditModal(false);
    setCurrentProject(null);
    
    toast({
      title: "Projeto atualizado",
      description: `O projeto "${newProject.title}" foi atualizado com sucesso.`,
    });
  };
  
  // Delete project
  const deleteProject = () => {
    if (!currentProject) return;
    
    setProjects(projects.filter((project) => project.id !== currentProject.id));
    setShowDeleteModal(false);
    setCurrentProject(null);
    
    toast({
      title: "Projeto excluído",
      description: `O projeto "${currentProject.title}" foi excluído com sucesso.`,
      variant: "destructive",
    });
  };
  
  return (
    <div>
      <ScrollAnimator>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Projetos</h1>
          <button
            onClick={openAddModal}
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
                <AnimatePresence>
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
                            className="w-10 h-10 rounded-md object-cover mr-3 bg-gray-100 dark:bg-gray-800" 
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
                        <div className="flex items-center">
                          <Switch
                            checked={project.visible}
                            onCheckedChange={() => toggleVisibility(project.id)}
                            className="mr-2"
                          />
                          <span className={`text-xs ${
                            project.visible 
                              ? "text-green-600 dark:text-green-400" 
                              : "text-red-600 dark:text-red-400"
                          }`}>
                            {project.visible ? "Visível" : "Oculto"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{project.views}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
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
                </AnimatePresence>
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
      
      {/* Add Project Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Projeto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                className="col-span-3"
                placeholder="Título do projeto"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className="col-span-3"
                placeholder="Descrição breve do projeto"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Imagem URL
              </Label>
              <Input
                id="image"
                value={newProject.image}
                onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                className="col-span-3"
                placeholder="URL da imagem"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTag" className="text-right">
                Tags
              </Label>
              <div className="col-span-3 flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    id="newTag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Adicionar tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {newProject.tags?.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Destaque
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newProject.featured}
                  onCheckedChange={(checked) => 
                    setNewProject({...newProject, featured: checked})
                  }
                />
                <Label htmlFor="featured">Mostrar em destaque</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button onClick={addProject}>
              <Check className="mr-2 h-4 w-4" />
              Adicionar Projeto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Project Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
          </DialogHeader>
          {currentProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Título
                </Label>
                <Input
                  id="edit-title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Descrição
                </Label>
                <Textarea
                  id="edit-description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Imagem URL
                </Label>
                <Input
                  id="edit-image"
                  value={newProject.image}
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-newTag" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      id="edit-newTag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Adicionar tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      Adicionar
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newProject.tags?.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-featured" className="text-right">
                  Destaque
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-featured"
                    checked={newProject.featured}
                    onCheckedChange={(checked) => 
                      setNewProject({...newProject, featured: checked})
                    }
                  />
                  <Label htmlFor="edit-featured">Mostrar em destaque</Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-visible" className="text-right">
                  Visibilidade
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-visible"
                    checked={newProject.visible}
                    onCheckedChange={(checked) => 
                      setNewProject({...newProject, visible: checked})
                    }
                  />
                  <Label htmlFor="edit-visible">
                    {newProject.visible ? "Visível" : "Oculto"}
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button onClick={updateProject}>
              <Check className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Projeto</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tem certeza que deseja excluir o projeto "{currentProject?.title}"? Esta ação não pode ser desfeita.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={deleteProject}>
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
