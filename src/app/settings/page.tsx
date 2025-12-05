/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/settings/page.tsx
 * @description Página de configuración de la aplicación
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

'use client'

import {
  Settings,
  Brain,
  Sliders,
  Sparkles,
  RotateCcw,
  Clipboard,
  BookOpen,
  Info,
  Globe,
  MessageSquare,
  History,
  Trash2,
  Copy,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSettingsStore, type PromptLanguage, type ResponseStyle } from '@/stores/settings-store'
import { useGeneratorStore } from '@/stores'
import { AI_MODELS, type ModelId } from '@/config/models'
import { getFrameworkById } from '@/lib/frameworks/data'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const tierColors = {
  free: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  standard: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  premium: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
}

const tierLabels = {
  free: 'Gratis',
  standard: 'Estandar',
  premium: 'Premium',
}

const languageOptions: { value: PromptLanguage; label: string; description: string }[] = [
  { value: 'es', label: 'Español', description: 'Prompts en español' },
  { value: 'en', label: 'English', description: 'Prompts in English' },
  { value: 'auto', label: 'Automatico', description: 'Detecta segun el contenido' },
]

const styleOptions: { value: ResponseStyle; label: string; description: string; tooltip: string }[] = [
  { value: 'concise', label: 'Conciso', description: 'Breve y directo', tooltip: 'Respuestas cortas que van al grano. Ideal para obtener informacion rapida sin explicaciones extensas.' },
  { value: 'detailed', label: 'Detallado', description: 'Explicaciones completas', tooltip: 'Respuestas exhaustivas con contexto, ejemplos y explicaciones paso a paso. Ideal para aprender o entender temas complejos.' },
  { value: 'technical', label: 'Tecnico', description: 'Terminologia especializada', tooltip: 'Usa vocabulario tecnico y profesional del sector. Ideal para documentacion, codigo o comunicacion entre expertos.' },
  { value: 'casual', label: 'Casual', description: 'Tono conversacional', tooltip: 'Lenguaje natural y cercano, como hablar con un colega. Ideal para brainstorming o exploracion de ideas.' },
]

export default function SettingsPage() {
  const {
    selectedModel,
    setSelectedModel,
    promptLanguage,
    setPromptLanguage,
    responseStyle,
    setResponseStyle,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    autoCopy,
    setAutoCopy,
    showExamples,
    setShowExamples,
    reset,
  } = useSettingsStore()

  const { history, clearHistory } = useGeneratorStore()

  const handleReset = () => {
    reset()
    toast.success('Configuracion restablecida a valores por defecto')
  }

  const handleClearHistory = () => {
    clearHistory()
    toast.success('Historial eliminado')
  }

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast.success('Prompt copiado')
    } catch {
      toast.error('Error al copiar')
    }
  }

  const currentModel = AI_MODELS[selectedModel]

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container py-8">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Configuracion</h1>
              <p className="text-muted-foreground mt-1">
                Personaliza como funciona el generador de prompts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8 flex-1">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Modelo de IA */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle>Modelo de IA</CardTitle>
                  <CardDescription>
                    Elige el modelo que procesara tus prompts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Modelo seleccionado</Label>
                <Select
                  value={selectedModel}
                  onValueChange={(v) => setSelectedModel(v as ModelId)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AI_MODELS).map(([key, model]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{model.name}</span>
                          {model.recommended && (
                            <Badge variant="default" className="text-[10px] px-1.5 py-0">
                              Recomendado
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Info del modelo actual */}
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{currentModel.name}</span>
                  <Badge className={cn('text-[10px] px-1.5 py-0', tierColors[currentModel.tier])}>
                    {tierLabels[currentModel.tier]}
                  </Badge>
                  {currentModel.capabilities.map((cap) => (
                    <Badge key={cap} variant="outline" className="text-[10px] px-1.5 py-0">
                      {cap === 'chat' && 'Chat'}
                      {cap === 'reasoning' && 'Razonamiento'}
                      {cap === 'code' && 'Codigo'}
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
                    {(currentModel.contextWindow / 1000).toFixed(0)}K contexto
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentModel.description}
                </p>
                <a
                  href={currentModel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  Ver en OpenRouter
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Idioma y Estilo */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <CardTitle>Idioma y estilo</CardTitle>
                  <CardDescription>
                    Define como se generan los prompts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Idioma */}
              <div className="space-y-3">
                <Label>Idioma del prompt</Label>
                <Select
                  value={promptLanguage}
                  onValueChange={(v) => setPromptLanguage(v as PromptLanguage)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span>{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Estilo */}
              <div className="space-y-3">
                <Label>Estilo de respuesta</Label>
                <div className="grid grid-cols-2 gap-2">
                  {styleOptions.map((option) => (
                    <TooltipProvider key={option.value}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setResponseStyle(option.value)}
                            className={cn(
                              'p-3 rounded-lg border text-left transition-all relative',
                              responseStyle === option.value
                                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            )}
                          >
                            <Info className="absolute top-2 right-2 h-3.5 w-3.5 text-muted-foreground" />
                            <p className="font-medium text-sm">{option.label}</p>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>{option.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parametros */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Sliders className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Parametros de generacion</CardTitle>
                  <CardDescription>
                    Ajusta como se generan los prompts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Temperatura */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      Temperatura
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Controla la aleatoriedad. Valores bajos = respuestas mas predecibles. Valores altos = mas creatividad.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {temperature < 0.5 ? 'Preciso y consistente' :
                       temperature < 1 ? 'Equilibrado' :
                       temperature < 1.5 ? 'Creativo' : 'Muy experimental'}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-lg font-mono px-3">
                    {temperature.toFixed(1)}
                  </Badge>
                </div>
                <Slider
                  value={[temperature]}
                  onValueChange={([v]) => setTemperature(v)}
                  min={0}
                  max={2}
                  step={0.1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Preciso (0)</span>
                  <span>Creativo (2)</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      Longitud maxima
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Numero maximo de tokens en la respuesta. Mas tokens = respuestas mas largas pero mas costosas.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {maxTokens < 1024 ? 'Respuestas cortas' :
                       maxTokens < 2048 ? 'Respuestas medias' :
                       maxTokens < 4096 ? 'Respuestas largas' : 'Respuestas muy largas'}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-lg font-mono px-3">
                    {maxTokens}
                  </Badge>
                </div>
                <Slider
                  value={[maxTokens]}
                  onValueChange={([v]) => setMaxTokens(v)}
                  min={256}
                  max={8192}
                  step={256}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>256 tokens</span>
                  <span>8192 tokens</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferencias */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle>Preferencias</CardTitle>
                  <CardDescription>
                    Personaliza tu experiencia
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                    <Clipboard className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="auto-copy" className="cursor-pointer">Copiar automaticamente</Label>
                    <p className="text-xs text-muted-foreground">
                      Al generar, copia el prompt al portapapeles
                    </p>
                  </div>
                </div>
                <Switch
                  id="auto-copy"
                  checked={autoCopy}
                  onCheckedChange={setAutoCopy}
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="show-examples" className="cursor-pointer">Mostrar ejemplos</Label>
                    <p className="text-xs text-muted-foreground">
                      Muestra ejemplos de uso en los formularios
                    </p>
                  </div>
                </div>
                <Switch
                  id="show-examples"
                  checked={showExamples}
                  onCheckedChange={setShowExamples}
                />
              </div>
            </CardContent>
          </Card>

          {/* Historial */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <History className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <CardTitle>Historial de prompts</CardTitle>
                    <CardDescription>
                      Ultimos {history.length} prompts generados
                    </CardDescription>
                  </div>
                </div>
                {history.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleClearHistory} className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Limpiar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-10 w-10 mx-auto mb-3 opacity-50" />
                  <p>Aun no has generado ningun prompt</p>
                  <Link href="/frameworks">
                    <Button variant="link" className="mt-2">
                      Explorar frameworks
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.slice(0, 5).map((item) => {
                    const framework = getFrameworkById(item.frameworkId)
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {framework?.acronym || item.frameworkId}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleCopyPrompt(item.prompt)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.prompt}
                        </p>
                      </div>
                    )
                  })}
                  {history.length > 5 && (
                    <p className="text-xs text-center text-muted-foreground">
                      +{history.length - 5} prompts mas en el historial
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reset */}
          <Card className="border-destructive/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle>Restablecer</CardTitle>
                  <CardDescription>
                    Vuelve a la configuracion por defecto
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Restablecer configuracion
              </Button>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  )
}
