
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Edit, Trash, Plus, Search, X, Check, Upload, Loader } from "lucide-react";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Project, projects as projectsData } from "@/data/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "@/components/ui/action-button";

// Lista predefinida de tags para autocompletar
const predefinedTags = [
  "React", "Vue.js", "Frontend", "Backend", "Fullstack", 
  "Design", "UI/UX", "Mobile", "Web", "API", 
  "Node.js", "TypeScript", "JavaScript", "CSS", "HTML",
  "Database", "Docker", "DevOps", "Cloud", "E-commerce"
];

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
    image: "",
    tags: [],
    featured: false,
    visible: true,
    views: 0,
  });
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    image?: string;
  }>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Filtrar projetos por busca
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Toggle visibilidade do projeto
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
  
  // Abrir modal de adicionar
  const openAddModal = () => {
    setNewProject({
      title: "",
      description: "",
      image: "",
      tags: [],
      featured: false,
      visible: true,
      views: 0,
    });
    setImagePreview(null);
    setErrors({});
    setShowAddModal(true);
  };
  
  // Abrir modal de editar
  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setNewProject({...project});
    setImagePreview(project.image);
    setErrors({});
    setShowEditModal(true);
  };
  
  // Abrir modal de excluir
  const openDeleteModal = (project: Project) => {
    setCurrentProject(project);
    setShowDeleteModal(true);
  };
  
  // Filtrar tags sugeridas com base no input
  useEffect(() => {
    if (newTag.trim()) {
      const filtered = predefinedTags.filter(tag => 
        tag.toLowerCase().includes(newTag.toLowerCase()) &&
        !newProject.tags?.includes(tag)
      );
      setTagSuggestions(filtered);
    } else {
      setTagSuggestions([]);
    }
  }, [newTag, newProject.tags]);
  
  // Adicionar tag ao projeto
  const addTag = () => {
    if (newTag.trim() && !newProject.tags?.includes(newTag.trim())) {
      setNewProject({
        ...newProject,
        tags: [...(newProject.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };
  
  // Remover tag do projeto
  const removeTag = (tag: string) => {
    setNewProject({
      ...newProject,
      tags: newProject.tags?.filter((t) => t !== tag),
    });
  };
  
  // Selecionar uma sugestão de tag
  const selectTagSuggestion = (tag: string) => {
    if (!newProject.tags?.includes(tag)) {
      setNewProject({
        ...newProject,
        tags: [...(newProject.tags || []), tag],
      });
      setNewTag("");
    }
  };
  
  // Lidar com upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validar tamanho do arquivo (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors({...errors, image: "A imagem deve ter no máximo 10MB"});
      return;
    }
    
    // Validar tipo do arquivo
    if (!file.type.match('image.*')) {
      setErrors({...errors, image: "O arquivo deve ser uma imagem"});
      return;
    }
    
    // Limpar erro existente
    setErrors({...errors, image: undefined});
    
    // Criar URL para pré-visualização
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setNewProject({...newProject, image: result});
    };
    reader.readAsDataURL(file);
  };
  
  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: {
      title?: string;
      description?: string;
      image?: string;
    } = {};
    
    if (!newProject.title?.trim()) {
      newErrors.title = "O título é obrigatório";
    }
    
    if (!newProject.description?.trim()) {
      newErrors.description = "A descrição é obrigatória";
    }
    
    if (!newProject.image && !imagePreview) {
      newErrors.image = "Uma imagem é obrigatória";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Adicionar novo projeto
  const addProject = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const id = newProject.title
        ?.toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-") || '';
        
      const date = new Date().toISOString().split("T")[0];
      
      const projectToAdd: Project = {
        id,
        title: newProject.title || "",
        description: newProject.description || "",
        image: newProject.image || imagePreview || "https://placehold.co/600x400/png",
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
    } catch (error) {
      toast({
        title: "Erro ao adicionar",
        description: "Ocorreu um erro ao adicionar o projeto.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Atualizar projeto
  const updateProject = async () => {
    if (!currentProject || !validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProjects(
        projects.map((project) => {
          if (project.id === currentProject.id) {
            const updatedProject = {
              ...project,
              title: newProject.title || project.title,
              description: newProject.description || project.description,
              image: newProject.image || imagePreview || project.image,
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
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar o projeto.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Excluir projeto
  const deleteProject = async () => {
    if (!currentProject) return;
    
    try {
      setIsSubmitting(true);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProjects(projects.filter((project) => project.id !== currentProject.id));
      setShowDeleteModal(false);
      setCurrentProject(null);
      
      toast({
        title: "Projeto excluído",
        description: `O projeto "${currentProject.title}" foi excluído com sucesso.`,
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao excluir o projeto.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="col-span-3">
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => {
                    setNewProject({...newProject, title: e.target.value});
                    if (e.target.value) {
                      setErrors({...errors, title: undefined});
                    }
                  }}
                  className={`${errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  placeholder="Título do projeto"
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => {
                    setNewProject({...newProject, description: e.target.value});
                    if (e.target.value) {
                      setErrors({...errors, description: undefined});
                    }
                  }}
                  className={`${errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  placeholder="Descrição breve do projeto"
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="image" className="text-right mt-2">
                Imagem
              </Label>
              <div className="col-span-3">
                <div className={`relative border-2 border-dashed rounded-lg p-4 ${errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}>
                  <input 
                    type="file" 
                    id="image" 
                    ref={fileInputRef}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  
                  <div className="text-center space-y-2">
                    {!imagePreview ? (
                      <>
                        <Upload className="h-10 w-10 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Arraste uma imagem ou clique para selecionar
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            PNG, JPG ou GIF (máx. 10MB)
                          </p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImagePreview(null);
                              setNewProject({...newProject, image: ""});
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-gray-700 dark:text-gray-300 underline"
                        >
                          Alterar imagem
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="newTag" className="text-right mt-2">
                Tags
              </Label>
              <div className="col-span-3">
                <div className="flex flex-col gap-2">
                  <div className="relative">
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
                      className="pr-20"
                    />
                    <Button 
                      type="button" 
                      onClick={addTag} 
                      className="absolute right-0 top-0 rounded-l-none h-full"
                      size="sm"
                    >
                      Adicionar
                    </Button>
                    
                    {/* Tag suggestions */}
                    {tagSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                        {tagSuggestions.map((tag) => (
                          <div
                            key={tag}
                            onClick={() => selectTagSuggestion(tag)}
                            className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Tags display */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newProject.tags?.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 text-xs"
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Destaque
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="featured"
                  checked={newProject.featured}
                  onCheckedChange={(checked) => 
                    setNewProject({...newProject, featured: checked})
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Mostrar em destaque
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <ActionButton 
              onClick={addProject} 
              isPending={isSubmitting}
            >
              <Check className="mr-2 h-4 w-4" />
              Adicionar Projeto
            </ActionButton>
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
                <div className="col-span-3">
                  <Input
                    id="edit-title"
                    value={newProject.title}
                    onChange={(e) => {
                      setNewProject({...newProject, title: e.target.value});
                      if (e.target.value) {
                        setErrors({...errors, title: undefined});
                      }
                    }}
                    className={`${errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Descrição
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="edit-description"
                    value={newProject.description}
                    onChange={(e) => {
                      setNewProject({...newProject, description: e.target.value});
                      if (e.target.value) {
                        setErrors({...errors, description: undefined});
                      }
                    }}
                    className={`${errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    required
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-image" className="text-right mt-2">
                  Imagem
                </Label>
                <div className="col-span-3">
                  <div className={`relative border-2 border-dashed rounded-lg p-4 ${errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}>
                    <input 
                      type="file" 
                      id="edit-image" 
                      ref={fileInputRef}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                    
                    <div className="text-center space-y-2">
                      {!imagePreview ? (
                        <>
                          <Upload className="h-10 w-10 mx-auto text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Arraste uma imagem ou clique para selecionar
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              PNG, JPG ou GIF (máx. 10MB)
                            </p>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImagePreview(null);
                                setNewProject({...newProject, image: ""});
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs text-gray-700 dark:text-gray-300 underline"
                          >
                            Alterar imagem
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-newTag" className="text-right mt-2">
                  Tags
                </Label>
                <div className="col-span-3">
                  <div className="flex flex-col gap-2">
                    <div className="relative">
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
                        className="pr-20"
                      />
                      <Button 
                        type="button" 
                        onClick={addTag} 
                        className="absolute right-0 top-0 rounded-l-none h-full"
                        size="sm"
                      >
                        Adicionar
                      </Button>
                      
                      {/* Tag suggestions */}
                      {tagSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                          {tagSuggestions.map((tag) => (
                            <div
                              key={tag}
                              onClick={() => selectTagSuggestion(tag)}
                              className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Tags display */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newProject.tags?.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 text-xs"
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
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-featured" className="text-right">
                  Destaque
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-featured"
                    checked={newProject.featured}
                    onCheckedChange={(checked) => 
                      setNewProject({...newProject, featured: checked})
                    }
                  />
                  <Label htmlFor="edit-featured" className="cursor-pointer">
                    Mostrar em destaque
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-visible" className="text-right">
                  Visibilidade
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-visible"
                    checked={newProject.visible}
                    onCheckedChange={(checked) => 
                      setNewProject({...newProject, visible: checked})
                    }
                  />
                  <Label htmlFor="edit-visible" className="cursor-pointer">
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
            <ActionButton 
              onClick={updateProject} 
              isPending={isSubmitting}
            >
              <Check className="mr-2 h-4 w-4" />
              Salvar Alterações
            </ActionButton>
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
            <ActionButton 
              variant="destructive" 
              onClick={deleteProject}
              isPending={isSubmitting}
            >
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </ActionButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
