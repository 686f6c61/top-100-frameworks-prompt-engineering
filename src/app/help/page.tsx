/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file app/help/page.tsx
 * @description Página de ayuda con documentación completa
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Sparkles,
  Settings,
  Cpu,
  HelpCircle,
  Layers,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Lightbulb,
  Code2,
  Users,
  TrendingUp,
  FileText,
  Search,
  Filter,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Ayuda - Top 100 Frameworks para Prompt Engineering',
  description: 'Documentación completa, guías de uso y preguntas frecuentes sobre los frameworks de prompt engineering.',
}

export default function HelpPage() {
  return (
    <div className="container py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-medium">Centro de Ayuda</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Documentación y Guías
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Todo lo que necesitas saber para aprovechar al máximo los 100 frameworks
          de prompt engineering y el sistema de generación inteligente.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Link href="#que-es">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <Lightbulb className="h-8 w-8 text-primary" />
              <span className="font-medium text-sm">¿Qué es esto?</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="#frameworks">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <Layers className="h-8 w-8 text-primary" />
              <span className="font-medium text-sm">Frameworks</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="#modelos">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <Cpu className="h-8 w-8 text-primary" />
              <span className="font-medium text-sm">Modelos IA</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="#faq">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" />
              <span className="font-medium text-sm">FAQ</span>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Section: ¿Qué es? */}
      <section id="que-es" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold">¿Qué es el Prompt Engineering?</h2>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              El <strong className="text-foreground">Prompt Engineering</strong> es el arte y la ciencia de comunicarse
              efectivamente con modelos de inteligencia artificial como ChatGPT, Claude, Gemini y otros. Consiste en
              estructurar las instrucciones, preguntas y contexto de manera que el modelo pueda entender exactamente
              qué necesitas y proporcionar respuestas precisas y útiles.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Piensa en ello como aprender un nuevo idioma: cuanto mejor estructures tu mensaje, mejor será la
              respuesta que recibas. Un prompt bien diseñado puede marcar la diferencia entre una respuesta genérica
              e inútil y una solución precisa que resuelve exactamente tu problema.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <Target className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Claridad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Los frameworks te ayudan a estructurar tus ideas de forma clara, eliminando ambigüedades
                que confunden al modelo de IA.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Eficiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Obtén respuestas precisas en el primer intento en lugar de iterar múltiples veces
                para conseguir lo que necesitas.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Consistencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Reproduce resultados de calidad de forma consistente utilizando metodologías
                probadas y estructuradas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section: Frameworks */}
      <section id="frameworks" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Los 100 Frameworks</h2>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Un <strong className="text-foreground">framework de prompt</strong> es una plantilla estructurada que
              te guía paso a paso sobre qué información incluir en tu prompt. Cada framework tiene componentes
              específicos diseñados para diferentes tipos de tareas y objetivos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Esta colección incluye <strong className="text-foreground">100 frameworks</strong> cuidadosamente
              seleccionados y organizados en 8 categorías. Desde clásicos como SMART y SWOT hasta metodologías
              especializadas para desarrollo de software, marketing, gestión de proyectos y más.
            </p>
          </CardContent>
        </Card>

        {/* Categorías */}
        <h3 className="text-lg font-semibold mb-4">Categorías disponibles</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Code2 className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Development (43)</h4>
                  <p className="text-sm text-muted-foreground">
                    Frameworks técnicos para desarrollo de software, arquitectura, debugging,
                    documentación de código y mejores prácticas de programación.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Management (14)</h4>
                  <p className="text-sm text-muted-foreground">
                    Metodologías para gestión de proyectos, liderazgo de equipos,
                    planificación estratégica y toma de decisiones organizacionales.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Communication (12)</h4>
                  <p className="text-sm text-muted-foreground">
                    Técnicas para comunicación efectiva, presentaciones, redacción
                    profesional y estructuración de mensajes claros.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Search className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Analysis (11)</h4>
                  <p className="text-sm text-muted-foreground">
                    Herramientas analíticas para investigación, resolución de problemas,
                    evaluación de opciones y toma de decisiones basada en datos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-pink-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Marketing (9)</h4>
                  <p className="text-sm text-muted-foreground">
                    Frameworks para copywriting, estrategias de ventas, comunicación
                    persuasiva y creación de contenido de marketing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Productivity (7)</h4>
                  <p className="text-sm text-muted-foreground">
                    Metodologías para productividad personal, gestión del tiempo,
                    establecimiento de objetivos y mejora continua.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-cyan-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Learning (2)</h4>
                  <p className="text-sm text-muted-foreground">
                    Técnicas para aprendizaje efectivo, desarrollo de habilidades
                    y transferencia de conocimiento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Transformation (2)</h4>
                  <p className="text-sm text-muted-foreground">
                    Frameworks para gestión del cambio organizacional, transformación
                    digital e innovación empresarial.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cómo usar */}
        <h3 className="text-lg font-semibold mb-4">Cómo usar los frameworks</h3>
        <Card>
          <CardContent className="pt-6">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="font-semibold mb-1">Explora la biblioteca</h4>
                  <p className="text-sm text-muted-foreground">
                    Navega por los frameworks usando los filtros de categoría, complejidad y búsqueda.
                    Cada tarjeta muestra un resumen del framework y sus características principales.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="font-semibold mb-1">Selecciona un framework</h4>
                  <p className="text-sm text-muted-foreground">
                    Haz clic en cualquier framework para ver su descripción completa, componentes,
                    ejemplos de uso y casos recomendados. Esto te ayudará a entender si es adecuado para tu tarea.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                <div>
                  <h4 className="font-semibold mb-1">Genera tu prompt</h4>
                  <p className="text-sm text-muted-foreground">
                    Usa el botón &quot;Generar Prompt&quot; para abrir el generador. Completa cada componente
                    del framework con tu información específica y el sistema creará un prompt optimizado.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">4</span>
                <div>
                  <h4 className="font-semibold mb-1">Copia y usa</h4>
                  <p className="text-sm text-muted-foreground">
                    El prompt generado estará listo para copiar y pegar en ChatGPT, Claude, Gemini
                    o cualquier otro modelo de IA que utilices.
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center">
          <Link href="/frameworks">
            <Button size="lg" className="gap-2">
              Explorar Frameworks
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Section: Modelos de IA */}
      <section id="modelos" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Cpu className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Modelos de IA</h2>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              El sistema utiliza <strong className="text-foreground">OpenRouter</strong> como gateway para acceder
              a múltiples modelos de inteligencia artificial. OpenRouter es un servicio que unifica el acceso a
              diferentes proveedores de IA bajo una única API, simplificando la integración y permitiendo cambiar
              entre modelos fácilmente.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Para utilizar las funcionalidades de IA (recomendación de frameworks y generación de prompts)
              necesitarás una API key de OpenRouter. Puedes obtenerla gratuitamente en{' '}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                openrouter.ai/keys
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Modelos disponibles */}
        <h3 className="text-lg font-semibold mb-4">Modelos disponibles</h3>
        <div className="space-y-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">Qwen QWQ 32B</h4>
                    <Badge variant="secondary">Recomendado</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modelo principal para generación de prompts. Destaca por sus capacidades de razonamiento
                    profundo y pensamiento extendido que producen prompts más elaborados y contextualizados.
                    Ideal para tareas complejas que requieren análisis detallado.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Alibaba</Badge>
                    <Badge variant="outline">32B parámetros</Badge>
                    <Badge variant="outline">Razonamiento avanzado</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">DeepSeek Chat V3</h4>
                    <Badge variant="secondary">Rápido</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modelo optimizado para respuestas rápidas y concisas. Excelente para recomendaciones
                    de frameworks por su velocidad y buena comprensión del contexto. Balancea calidad
                    y velocidad de forma eficiente.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">DeepSeek</Badge>
                    <Badge variant="outline">Baja latencia</Badge>
                    <Badge variant="outline">Económico</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">Kimi K2</h4>
                    <Badge variant="secondary">Contexto largo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modelo de Moonshot AI con una ventana de contexto masiva de 128K tokens. Ideal para
                    proyectos que requieren procesar grandes cantidades de información de referencia
                    o documentos extensos.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Moonshot AI</Badge>
                    <Badge variant="outline">128K contexto</Badge>
                    <Badge variant="outline">Documentos largos</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Link href="/settings">
            <Button variant="outline" size="lg" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurar modelo
            </Button>
          </Link>
        </div>
      </section>

      {/* Section: Configuración */}
      <section id="configuracion" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Configuración</h2>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                API Key de OpenRouter
              </h4>
              <p className="text-sm text-muted-foreground">
                La API key es necesaria para las funcionalidades de IA. Puedes configurarla de dos formas:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside ml-4">
                <li>
                  <strong>En la aplicación:</strong> Ve a Configuración y pega tu API key en el campo correspondiente.
                  Se guardará en el almacenamiento local de tu navegador.
                </li>
                <li>
                  <strong>Variable de entorno:</strong> Crea un archivo <code className="bg-muted px-1 rounded">.env.local</code> con
                  la variable <code className="bg-muted px-1 rounded">OPENROUTER_API_KEY</code>.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Selección de modelo
              </h4>
              <p className="text-sm text-muted-foreground">
                Elige el modelo que mejor se adapte a tus necesidades. Qwen QWQ 32B es ideal para
                generación de prompts complejos, mientras que DeepSeek Chat V3 es más rápido para
                tareas simples.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Tema de la interfaz
              </h4>
              <p className="text-sm text-muted-foreground">
                Usa el botón de sol/luna en la cabecera para alternar entre modo claro y oscuro.
                La preferencia se guarda automáticamente.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section: FAQ */}
      <section id="faq" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <HelpCircle className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Necesito una API key para usar la aplicación?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                No necesariamente. Puedes explorar todos los frameworks, leer sus descripciones y componentes
                sin una API key. Sin embargo, para usar las funcionalidades de IA (recomendación automática
                de frameworks y generación inteligente de prompts), sí necesitarás una API key de OpenRouter.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>¿La API key de OpenRouter es gratuita?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                OpenRouter ofrece créditos gratuitos al registrarte. Los modelos que usamos (Qwen, DeepSeek, Kimi)
                tienen costes muy bajos, por lo que los créditos gratuitos suelen ser suficientes para un uso
                moderado. Puedes ver los precios exactos en la página de cada modelo en OpenRouter.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>¿Mis datos están seguros?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Sí. Tu API key se guarda únicamente en el almacenamiento local de tu navegador y nunca se envía
                a nuestros servidores. Las llamadas a OpenRouter se hacen directamente desde tu navegador.
                Los prompts que generas no se almacenan en ningún lugar.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>¿Qué framework debo usar para mi tarea?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Depende de tu objetivo. Usa los filtros de categoría para encontrar frameworks relacionados
                con tu área (desarrollo, marketing, gestión, etc.). También puedes usar la función de
                recomendación: describe tu objetivo y el sistema te sugerirá el framework más adecuado.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>¿Puedo usar los prompts generados en cualquier IA?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Sí, absolutamente. Los prompts generados son texto estructurado que puedes copiar y pegar
                en ChatGPT, Claude, Gemini, Llama, Mistral o cualquier otro modelo de lenguaje. Los frameworks
                son metodologías agnósticas que funcionan con cualquier IA.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>¿Cómo elijo entre los diferentes modelos de IA?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                <strong>Qwen QWQ 32B</strong> es el mejor para tareas complejas que requieren razonamiento profundo.
                <strong> DeepSeek Chat V3</strong> es más rápido y económico para tareas simples.
                <strong> Kimi K2</strong> es ideal si necesitas procesar documentos muy largos gracias a su
                contexto de 128K tokens.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>¿La aplicación funciona offline?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Parcialmente. La exploración de frameworks funciona offline una vez cargada la página.
                Sin embargo, las funcionalidades de IA (recomendación y generación) requieren conexión
                a internet para comunicarse con los modelos a través de OpenRouter.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>¿Puedo contribuir con nuevos frameworks?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                ¡Sí! El proyecto es open source y las contribuciones son bienvenidas. Puedes abrir un
                issue o pull request en{' '}
                <a
                  href="https://github.com/686f6c61/top-100-frameworks-prompt-engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
                . Cada framework debe seguir la estructura definida en el tipo TypeScript del proyecto.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Footer CTA */}
      <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/20">
        <CardContent className="py-8 text-center">
          <h3 className="text-xl font-bold mb-2">¿Listo para empezar?</h3>
          <p className="text-muted-foreground mb-6">
            Explora los 100 frameworks y empieza a crear prompts más efectivos hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/frameworks">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Layers className="h-4 w-4" />
                Ver Frameworks
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <Settings className="h-4 w-4" />
                Configurar API
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
