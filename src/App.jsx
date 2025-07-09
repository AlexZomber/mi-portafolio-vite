import React, { useState } from 'react';

// Componente para una tarjeta de proyecto reutilizable
const ProjectCard = ({ title, description, link, category, isDetailView, onDetailClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-200">
    <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
    <p className="text-gray-700 text-sm mb-4">{description}</p>
    <div className="flex justify-end">
      {isDetailView ? (
        <button
          onClick={onDetailClick} // Llama a la función para abrir el modal
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center space-x-1"
        >
          Ver Detalles
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      ) : (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center space-x-1">
          Ver Detalles
          <svg xmlns="http://www.w3.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      )}
    </div>
  </div>
);

// Nuevo componente para la ventana modal de detalles del proyecto
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null; // No se renderiza si no hay proyecto seleccionado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      {/* Ajustado el padding y el max-w del contenedor del modal a max-w-md */}
      <div className="bg-white rounded-lg shadow-xl p-4 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Botón de cerrar: ahora es un círculo rojo con una 'x' blanca y más grande */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-red-600 transition-colors"
          aria-label="Cerrar"
        >
          &times;
        </button>

        {/* Contenedor flex para todo el contenido dentro del modal, gestiona el espaciado vertical */}
        <div className="flex flex-col items-center gap-y-0">
          {/* Título centrado con margen inferior aumentado a mb-4 para separarlo del video */}
          {/* Ajustado el tamaño de la fuente del título del modal */}
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4 text-center">{project.title}</h2>

          {/* Renderiza video o imagen condicionalmente */}
          {project.videoEmbedSrc && !project.embedSrc && ( // Existing video logic
            <div className="relative w-full max-w-sm mx-auto mb-4" style={{ paddingBottom: '177.77%', height: 0 }}>
              <iframe
                src={project.videoEmbedSrc}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-md"
                style={{ border: 'none' }}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/FF0000/FFFFFF?text=Error"; console.warn("Error al cargar el video incrustado."); }}
              ></iframe>
            </div>
          )}

          {project.imageSrc && (
            <div className="relative w-full max-w-sm mx-auto mb-4"> {/* max-w-sm para imágenes también */}
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-auto rounded-md object-contain" // object-contain para evitar estirar
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/FF0000/FFFFFF?text=Error+Carga+Imagen"; console.warn("Error al cargar la imagen del proyecto."); }}
              />
            </div>
          )}

          {project.embedSrc && project.embedWidth && project.embedHeight && ( // New generic embed logic for Facebook posts etc.
            <div className="relative w-full mx-auto mb-4" style={{
              width: '100%', // Take full width of parent
              maxWidth: `${project.embedWidth}px`, // Max width based on embed
              height: `${project.embedHeight}px`, // Fixed height based on embed
              overflow: 'hidden' // Hide scrollbars if content overflows
            }}>
              <iframe
                src={project.embedSrc}
                title={project.title}
                width="100%" // Make iframe responsive to its parent div
                height="100%" // Make iframe responsive to its parent div
                style={{ border: 'none' }}
                scrolling="no"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/FF0000/FFFFFF?text=Error"; console.warn("Error al cargar el contenido incrustado."); }}
              ></iframe>
            </div>
          )}

          {/* El detailContent ahora se renderiza si existe */}
          {project.detailContent && (
            // Se aplica un estilo directo para asegurar que no haya margen superior.
            <div className="prose max-w-none text-gray-800 leading-relaxed" style={{ marginTop: '0px' }} dangerouslySetInnerHTML={{ __html: project.detailContent }} />
          )}
        </div>
      </div>
    </div>
  );
};


function App() {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'educativos', 'marketing'
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null); // Estado para controlar qué proyecto se muestra en el modal

  // Estado para controlar el modal de selección de servicio de correo
  const [showEmailServiceModal, setShowEmailServiceModal] = useState(false);

  // Función para manejar la selección del servicio de correo
  const handleEmailServiceSelection = (service) => {
    const emailAddress = "alejandrosanchezrogel99@gmail.com";
    let url = '';
    if (service === 'gmail') {
      url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${emailAddress}`;
    } else if (service === 'outlook') {
      url = `https://outlook.live.com/mail/0/deeplink/compose?to=${emailAddress}`;
    }
    if (url) {
      window.open(url, '_blank');
    }
    setShowEmailServiceModal(false); // Cerrar el modal después de la selección
  };

  // Contenido personalizado para el modal de selección de servicio de correo
  const emailServiceSelectionContent = (
    <div className="flex flex-col space-y-4">
      <p className="text-gray-700 text-center text-base mb-4">¿Qué servicio de correo deseas usar?</p>
      <button
        onClick={() => handleEmailServiceSelection('gmail')}
        className="px-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
      >
        <img src="https://i.imgur.com/X0imbxf.png" alt="Icono de Gmail" className="w-6 h-6 object-contain" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/FF0000/FFFFFF?text=G"; }} />
        <span>Abrir con Gmail</span>
      </button>
      <button
        onClick={() => handleEmailServiceSelection('outlook')}
        className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
      >
        <img src="https://i.imgur.com/nqoZG76.png" alt="Icono de Outlook" className="w-6 h-6 object-contain" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/0000FF/FFFFFF?text=O"; }} />
        <span>Abrir con Outlook</span>
      </button>
    </div>
  );


  // Datos de ejemplo para los proyectos
  const projects = [
    // Marketing Projects
    {
      id: 8,
      title: "Video publicitario de consultorio psicologico con voces IA",
      description: "Campaña innovadora para un consultorio psicológico utilizando locuciones generadas por inteligencia artificial.",
      category: "marketing",
      isDetailView: true,
      videoEmbedSrc: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fvitalconsultoriospa%2Fvideos%2F1121329693093594%2F&show_text=false&width=267&t=0",
      detailContent: `
        <p style="margin-top: 0;">Este proyecto se centró en la creación de un anuncio de video impactante para el consultorio psicológico "Vital Consultorio Spa", destacando la empatía y profesionalismo de sus servicios a través de un enfoque moderno.</p>
        <p><strong>Proceso de Creación Detallado:</strong></p>
        <ul>
          <li><strong>Guionización y Concepto:</strong> Se desarrolló un guion cuidadosamente redactado para abordar temas sensibles relacionados con el bienestar mental, con un mensaje positivo y alentador. El concepto visual se centró en la tranquilidad y la profesionalidad.</li>
          <li><strong>Locución con IA Avanzada:</strong> Se utilizaron plataformas de inteligencia artificial de última generación para generar voces en off. Esto permitió experimentar con diferentes tonos, ritmos y acentos para encontrar la voz perfecta que transmitiera calma y confianza, optimizando el tiempo de producción y los costos asociados a la grabación tradicional.</li>
          <li><strong>Selección de Metraje y Edición Visual:</strong> Se combinaron imágenes de archivo de alta calidad y animaciones sutiles para crear un flujo visual armonioso que complementara el mensaje auditivo. La edición se realizó para mantener un ritmo pausado y reflexivo, acorde con el tema psicológico.</li>
          <li><strong>Diseño de Sonido y Música:</strong> Se seleccionó una banda sonora instrumental suave y relajante, diseñada para evocar una sensación de paz. Se añadieron efectos de sonido mínimos y estratégicos para resaltar momentos clave sin distraer del mensaje principal.</li>
        </ul>
        <p>El uso innovador de voces generadas por IA no solo agilizó el proceso de producción, sino que también garantizó una calidad de audio consistente y profesional, resultando en un video publicitario efectivo y conmovedor que resuena con la audiencia.</p>
      `,
    },
    {
      id: 19,
      title: "Diseño de Logotipo para Tienda de Ropa Infantil",
      description: "Creación de un logotipo atractivo y memorable para una tienda de ropa de niños y niñas, enfocado en la identidad de marca. Se muestra un post de Facebook con el diseño.",
      category: "marketing",
      isDetailView: true,
      embedSrc: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%2F%3Ffbid%3D122102308184440467%26set%3Da.122102306588440467&show_text=true&width=500",
      embedWidth: 500,
      embedHeight: 533,
      detailContent: `
        <p style="margin-top: 0;">Este proyecto se centró en el diseño de un logotipo vibrante y atractivo para una tienda de ropa infantil, con el objetivo de crear una identidad de marca que resuene con padres e hijos. La evidencia se presenta a través de un post de Facebook.</p>
        <p><strong>Proceso de Diseño y Objetivos:</strong></p>
        <ul>
          <li><strong>Investigación de Mercado y Audiencia:</strong> Se analizó el público objetivo (padres con niños pequeños) y la competencia para identificar tendencias y elementos visuales que atrajeran a esta demografía.</li>
          <li><strong>Concepto y Bocetos:</strong> Se exploraron diversas ideas que evocaran diversión, ternura y calidad, utilizando elementos gráficos como animales, juguetes o tipografías lúdicas.</li>
          <li><strong>Selección de Paleta de Colores:</strong> Se eligieron colores brillantes y amigables que transmitieran alegría y energía, adecuados para el sector infantil.</li>
          <li><strong>Tipografía:</strong> Se seleccionó una fuente que fuera legible, amigable y que complementara el estilo visual del logo.</li>
          <li><strong>Iteración y Refinamiento:</strong> Se presentaron varias propuestas al cliente, se recibieron comentarios y se realizaron ajustes hasta llegar al diseño final que capturara la esencia de la marca.</li>
          <li><strong>Versatilidad del Logotipo:</strong> Se aseguró que el logotipo fuera adaptable para diferentes usos, como etiquetas de ropa, bolsas, sitio web y redes sociales.</li>
        </ul>
        <p>El resultado es un logotipo que no solo es visualmente atractivo para los niños, sino que también transmite confianza y calidad a los padres, estableciendo una base sólida para la identidad de marca de la tienda de ropa infantil.</p>
      `,
    },
    {
      id: 9,
      title: "Video Publicitario Tienda de Ropa para Niña con Voces IA",
      description: "Campaña publicitaria creativa para una tienda de ropa infantil, utilizando voces generadas por inteligencia artificial para un toque único y atractivo.",
      category: "marketing",
      isDetailView: true,
      videoEmbedSrc: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1408584029826792&show_text=false&width=267&t=0",
      detailContent: `
        <p style="margin-top: 0;">Este proyecto se enfocó en crear un video publicitario encantador y efectivo para una tienda de ropa de niña, destacando la ternura y la calidad de sus productos a través de una narrativa innovadora.</p>
        <p><strong>Proceso de Creación Detallado:</strong></p>
        <ul>
          <li><strong>Guionización y Concepto:</strong> Se desarrolló un guion que resaltara la alegría y la moda infantil, con un tono juguetón y amigable. El concepto visual se centró en colores vibrantes, modelos infantiles y escenarios que evocaran diversión.</li>
          <li><strong>Locución con IA Avanzada:</strong> Se emplearon herramientas de inteligencia artificial para generar voces en off con tonos infantiles o narrativos suaves, que complementaran la temática de la tienda de ropa para niñas. Esto permitió una flexibilidad creativa y una producción eficiente.</li>
          <li><strong>Selección de Metraje y Edición Visual:</strong> Se utilizaron clips de video y fotografías de alta calidad que mostraban la ropa en acción, con niños jugando y modelando. La edición se realizó para mantener un ritmo dinámico y alegre, capturando la atención del público objetivo.</li>
          <li><strong>Diseño de Sonido y Música:</strong> Se seleccionó una banda sonora pegadiza y optimista, adecuada para un público infantil y familiar. Se añadieron efectos de sonido sutiles para realzar la atmósfera lúdica del video.</li>
        </ul>
        <p>La integración de voces generadas por IA en este proyecto no solo optimizó el proceso de producción, sino que también aportó una cualidad distintiva y memorable al anuncio, logrando conectar emocionalmente con los padres y sus hijos.</p>
      `,
    },
    {
      id: 10,
      title: "Video Publicitario Tienda de Ropa para Mujer con Voces IA",
      description: "Campaña de marketing para una tienda de moda femenina, utilizando voces generadas por inteligencia artificial para un estilo moderno y sofisticado.",
      category: "marketing",
      isDetailView: true,
      videoEmbedSrc: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1169739097483537%3Flocale%3Des_LA&show_text=false&width=267&t=0",
      detailContent: `
        <p style="margin-top: 0;">Este proyecto tuvo como objetivo crear un video publicitario elegante y atractivo para una tienda de ropa de mujer, enfocándose en la moda, la versatilidad y la confianza que sus prendas pueden ofrecer.</p>
        <p><strong>Proceso de Creación Detallado:</strong></p>
        <ul>
          <li><strong>Guionización y Concepto:</strong> Se desarrolló un guion que destacara las últimas tendencias de moda y la diversidad de estilos, con un tono que transmitiera empoderamiento y sofisticación. El concepto visual se centró en pasarelas, combinaciones de atuendos y escenarios urbanos o de estudio.</li>
          <li><strong>Locución con IA Avanzada:</strong> Se utilizaron herramientas de inteligencia artificial para generar voces en off con tonos maduros y elegantes, que se alinearan con la imagen de marca de una tienda de moda femenina. Esto permitió una producción de alta calidad y una voz consistente.</li>
          <li><strong>Selección de Metraje y Edición Visual:</strong> Se emplearon clips de video y fotografías de modelos luciendo diferentes prendas, con transiciones suaves y efectos visuales que realzaran la estética de la moda. La edición se realizó para mantener un ritmo dinámico y chic, ideal para el público objetivo.</li>
          <li><strong>Diseño de Sonido y Música:</strong> Se seleccionó una banda sonora contemporánea y con estilo, que complementara la atmósfera de moda del video. Se añadieron efectos de sonido sutiles para resaltar los movimientos y los detalles de las prendas.</li>
        </ul>
        <p>La implementación de voces generadas por IA en este anuncio no solo optimizó el flujo de trabajo, sino que también contribuyó a crear un producto final pulido y profesional, que resuena con la audiencia femenina interesada en la moda.</p>
      `,
    },
    // Educational Projects
    {
      id: 11,
      title: "Lámpara Minimalista Educativa (Proyecto de Electricidad)",
      description: "Proyecto educativo práctico que enseña los fundamentos de la electricidad a través de la construcción de una lámpara minimalista funcional.",
      category: "educativos",
      isDetailView: true,
      imageSrc: "https://scontent.ftlc2-1.fna.fbcdn.net/v/t39.30808-6/472709951_122186694428139901_192619125706750827_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFFWKEzQySo1nH3khoihgzYQ52UIPvnwGRDnZQg--fAZNsM6_EI7-6FsbsB0X2-Z1r50hhQwBe04wMyymJwzWp6&_nc_ohc=zpr_BwhhckkQ7kNvwEGeMl6&_nc_oc=AdlSXlnYdKBogJhqYWLRgrWPL2rKyDtuhqLNR1rCFbpUUk3KMjFTQUUO1cOP-9R1rCFbpUUk3KMjFTQUUO1cOP-9RuiMWPY_KN4qDOpGJPPrGVljex&_nc_zt=23&_nc_ht=scontent.ftlc2-1.fna&_nc_gid=PSyZGu4vdy1qIfSKTJtRTw&oh=00_AfRN3r5xnKY-FDN8OCT_nXhUF63rFte9ZVfpZOGllDo1hw&oe=686F82E2",
      detailContent: `
        <p style="margin-top: 0;">Este proyecto educativo se diseñó para introducir conceptos básicos de electricidad y circuitos de una manera práctica y visualmente atractiva. La construcción de una lámpara minimalista permite a los estudiantes comprender los principios fundamentales de la energía eléctrica y su aplicación en la vida cotidiana.</p>
        <p><strong>Proceso de Creación Detallado y Objetivos Educativos:</strong></p>
        <ul>
          <li><strong>Concepto y Diseño:</strong> Se ideó una lámpara con un diseño simple y estético, priorizando la claridad de los componentes eléctricos para facilitar el aprendizaje. El enfoque minimalista ayuda a los estudiantes a concentrarse en la función eléctrica sin distracciones.</li>
          <li><strong>Materiales Didácticos:</strong> Se seleccionaron materiales accesibles y seguros para la manipulación por parte de los estudiantes, como madera, cables de baja tensión, un interruptor simple y una bombilla LED de bajo consumo.</li>
          <li><strong>Montaje del Circuito:</strong> Los estudiantes aprenden a identificar los componentes (fuente de energía, conductor, interruptor, carga), a conectar un circuito en serie o paralelo, y a comprender el flujo de corriente. Se enfatiza la seguridad en el manejo de conexiones eléctricas.</li>
          <li><strong>Habilidades Desarrolladas:</strong>
            <ul>
              <li>Comprensión de circuitos eléctricos básicos.</li>
              <li>Identificación y función de componentes eléctricos.</li>
              <li>Habilidades de ensamblaje y conexión.</li>
              <li>Resolución de problemas básicos de circuitos.</li>
              <li>Conciencia sobre la seguridad eléctrica.</li>
            </ul>
          </li>
        </ul>
        <p>El resultado es una lámpara funcional que sirve como una evidencia tangible del aprendizaje, y un recordatorio de cómo la teoría eléctrica se aplica en objetos del día a día. Este proyecto fomenta el pensamiento lógico, la creatividad y la curiosidad por la ingeniería.</p>
      `,
    },
    {
      id: 16,
      title: "Kiosko con Bombilla Funcional (Proyecto de Electricidad y Artes)",
      description: "Construcción de un kiosko en miniatura con palillos de madera que incorpora un circuito eléctrico funcional para encender una bombilla.",
      category: "educativos",
      isDetailView: true,
      embedSrc: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F61554197036900%2Fvideos%2F280298625090647%2F&show_text=false&width=476&t=0",
      embedWidth: 476,
      embedHeight: 476,
      detailContent: `
        <p style="margin-top: 0;">Este proyecto combina la creatividad artística con los principios básicos de la electricidad, resultando en la construcción de un kiosko en miniatura hecho con palillos de madera que incluye una bombilla funcional.</p>
        <p><strong>Objetivos de Aprendizaje y Proceso:</strong></p>
        <ul>
          <li><strong>Integración de Disciplinas:</strong> El proyecto fusiona el arte (diseño y construcción con palillos) y la electricidad (creación de un circuito simple).</li>
          <li><strong>Construcción Estructural:</strong> Los participantes aprenden a ensamblar una estructura tridimensional utilizando palillos de madera, desarrollando habilidades de diseño y construcción.</li>
          <li><strong>Principios Eléctricos Básicos:</strong> Se introduce el concepto de un circuito eléctrico simple, incluyendo una fuente de energía (batería), conductores (cables), un interruptor y una carga (bombilla). Los estudiantes conectan estos componentes para que la bombilla se encienda.</li>
          <li><strong>Habilidades Motrices y Resolución de Problemas:</strong> El ensamblaje de los palillos y la conexión de los componentes eléctricos requieren precisión y la capacidad de resolver pequeños desafíos técnicos.</li>
          <li><strong>Creatividad y Funcionalidad:</strong> El resultado es un objeto decorativo y funcional, que demuestra la aplicación práctica de los conocimientos adquiridos en electricidad y artes.</li>
        </ul>
        <p>Este proyecto es ideal para demostrar cómo la ciencia y el arte pueden complementarse, proporcionando una experiencia de aprendizaje práctica y atractiva sobre la construcción y el funcionamiento de circuitos eléctricos en un contexto creativo.</p>
      `,
    },
    {
      id: 17,
      title: "Casa con Múltiples Focos Funcionales (Proyecto de Electricidad y Artes)",
      description: "Construcción de una casa en miniatura que demuestra la funcionalidad de circuitos eléctricos con múltiples puntos de luz, incluyendo aspectos artísticos en su diseño y acabado.",
      category: "educativos",
      isDetailView: true,
      embedSrc: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F61554197036900%2Fvideos%2F231730673237009%2F&show_text=false&width=476&t=0",
      embedWidth: 476,
      embedHeight: 476,
      detailContent: `
        <p style="margin-top: 0;">Este proyecto educativo consiste en la creación de una casa en miniatura que incorpora un sistema de iluminación eléctrica funcional con múltiples focos. Es una excelente manera de enseñar conceptos avanzados de circuitos y cableado en un entorno práctico, además de integrar elementos artísticos en su construcción y acabado.</p>
        <p><strong>Objetivos de Aprendizaje y Proceso:</strong></p>
        <ul>
          <li><strong>Comprensión de Circuitos Complejos:</strong> Los participantes aprenden a diseñar y cablear circuitos que alimentan múltiples cargas (focos), explorando conceptos como circuitos en serie y en paralelo para diferentes áreas de la casa.</li>
          <li><strong>Distribución de Energía:</strong> Se explica cómo la energía se distribuye a través de la estructura para encender cada foco de manera independiente o conjunta, según el diseño de los interruptores.</li>
          <li><strong>Habilidades de Cableado y Conexión:</strong> El proyecto requiere la conexión precisa de cables, focos y posiblemente interruptores, desarrollando habilidades manuales y de resolución de problemas eléctricos.</li>
          <li><strong>Integración Artística:</strong> Además de la funcionalidad eléctrica, se enfatiza el aspecto artístico en la construcción de la maqueta de la casa, incluyendo detalles de diseño, pintura y decoración, lo que añade un componente creativo al aprendizaje de la electricidad.</li>
          <li><strong>Aplicación Práctica:</strong> Demuestra cómo los principios eléctricos se aplican en la vida real, como en la instalación de iluminación en edificios y hogares.</li>
          <li><strong>Materiales Utilizados:</strong> La casa se construye con materiales como palillos de madera, cartón o maquetas, y se utilizan focos LED pequeños, cables delgados, una fuente de energía (batería) e interruptores.</li>
        </ul>
        <p>El resultado es una maqueta de casa iluminada que sirve como una poderosa herramienta didáctica para visualizar y comprender el funcionamiento de sistemas eléctricos más complejos, fomentando la curiosidad por la ingeniería eléctrica y la automatización del hogar, al mismo tiempo que se desarrollan habilidades artísticas y de diseño.</p>
      `,
    },
    {
      id: 18,
      title: "Circuito de Energía Eólica (Proyecto de Electricidad y Artes)",
      description: "Proyecto educativo que demuestra la generación de energía eólica a través de una maqueta de casa de cartón con un molino funcional que enciende una bombilla.",
      category: "educativos",
      isDetailView: true,
      embedSrc: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F61554197036900%2Fvideos%2F240894105626766%2F&show_text=false&width=476&t=0",
      embedWidth: 476,
      embedHeight: 476,
      detailContent: `
        <p style="margin-top: 0;">Este proyecto educativo combina los principios de la energía renovable con la creatividad artística, presentando una maqueta de casa de cartón con un molino de viento funcional que genera electricidad para encender una bombilla.</p>
        <p><strong>Objetivos de Aprendizaje y Proceso:</strong></p>
        <ul>
          <li><strong>Principios de Energía Eólica:</strong> Los participantes aprenden cómo la energía del viento puede ser convertida en energía eléctrica utilizando un molino (turbina eólica en miniatura) conectado a un pequeño generador.</li>
          <li><strong>Circuitos Eléctricos Básicos:</strong> Se introduce el concepto de un circuito cerrado, donde la energía generada por el molino fluye a través de cables para alimentar una bombilla LED.</li>
          <li><strong>Construcción y Diseño Artístico:</strong> La casa de cartón y el molino son construidos y pintados, lo que permite a los estudiantes expresar su creatividad mientras aprenden sobre estructuras y diseño.</li>
          <li><strong>Sostenibilidad y Conciencia Ambiental:</strong> El proyecto resalta la importancia de las fuentes de energía renovables y cómo se pueden aplicar en la vida cotidiana.</li>
          <li><strong>Habilidades Prácticas:</strong> Implica cortar, pegar, ensamblar y conectar componentes, desarrollando habilidades motoras finas y de resolución de problemas.</li>
          <li><strong>Materiales Utilizados:</strong> Cartón para la estructura de la casa, palillos o materiales ligeros para las aspas del molino, un pequeño motor/generador, cables, una bombilla LED y pinturas.</li>
        </ul>
        <p>El resultado es una maqueta interactiva que no solo es visualmente atractiva, sino que también proporciona una demostración práctica y memorable de cómo funciona la energía eólica y la electricidad, fomentando la innovación y la conciencia ecológica.</p>
      `,
    },
    {
      id: 12,
      title: "Tipos de Circuitos Eléctricos (Proyecto de Electricidad)",
      description: "Representación visual y explicativa de los diferentes tipos de circuitos eléctricos (serie, paralelo, mixto) para facilitar su comprensión.",
      category: "educativos",
      isDetailView: true,
      imageSrc: "https://scontent.ftlc2-1.fna.fbcdn.net/v/t39.30808-6/472759582_122186694848139901_9181276620637151550_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGInh2hoS58ShWc4xl8eQaEKb1OMJIMcDQpvU4wkgxwNFSQYS0RaMYU8ybcNprBPuD5OonTf6N8pqj_R19pjR8i&_nc_ohc=n4XiM4hEmu4Q7kNvwF-z1Gy&_nc_oc=AdkwIoreIsH1UKPQm6B5fZ0ekT7hHMw38FhK_EK8XUSU1Vd7pn8dR2jEdzDG867-51e5sAunIWF1xmubTqL36P_0&_nc_zt=23&_nc_ht=scontent.ftlc2-1.fna&_nc_gid=zl7KnRqOcGMRv7hydojaKA&oh=00_AfTpYNiUcD-r7qWEtt5h4O_ZyA-2HzQ7zS8TcTyumfZGAA&oe=686F7D90",
      detailContent: `
        <p style="margin-top: 0;">Este proyecto educativo se enfoca en la explicación clara y visual de los tres tipos fundamentales de circuitos eléctricos: serie, paralelo y mixto. Su objetivo es proporcionar a los estudiantes una comprensión sólida de cómo fluye la corriente y cómo se comportan los componentes en cada configuración.</p>
        <p><strong>Componentes y Metodología Educativa:</strong></p>
        <ul>
          <li><strong>Diagramas Claros y Etiquetados:</strong> Se crearon diagramas esquemáticos detallados para cada tipo de circuito, utilizando simbología estándar para resistencias, fuentes de voltaje, interruptores, etc. Cada componente y sección del circuito está claramente etiquetado para facilitar la identificación.</li>
          <li><strong>Explicaciones Conceptuales:</strong> Junto a cada diagrama, se proporcionan descripciones concisas que explican las características clave de cada circuito:
            <ul>
              <li><strong>Circuito en Serie:</strong> Se destaca que la corriente es la misma en todos los puntos y que la resistencia total es la suma de las resistencias individuales.</li>
              <li><strong>Circuito en Paralelo:</strong> Se explica que el voltaje es el mismo en todos los ramales y que la corriente total se divide entre ellos. Se hace énfasis en cómo la adición de más componentes en paralelo disminuye la resistencia total.</li>
              <li><strong>Circuito Mixto:</strong> Se ilustra cómo combinar elementos en serie y paralelo, y cómo analizar estos circuitos más complejos paso a paso.</li>
            </ul>
          </li>
          <li><strong>Aplicaciones Prácticas (Ejemplos):</strong> Se incluyen ejemplos sencillos de dónde se pueden encontrar estos tipos de circuitos en la vida real (ej. luces de Navidad en serie, electrodomésticos en paralelo) para hacer el aprendizaje más relevante.</li>
          <li><strong>Objetivos de Aprendizaje:</strong>
            <ul>
              <li>Diferenciar entre circuitos en serie, paralelo y mixto.</li>
              <li>Comprender el comportamiento de la corriente y el voltaje en cada tipo de circuito.</li>
              <li>Aplicar los principios básicos para el análisis de circuitos simples.</li>
              <li>Desarrollar una base sólida para estudios más avanzados en electricidad.</li>
            </ul>
          </li>
        </ul>
        <p>Este recurso visual es ideal para el aula o el estudio individual, ya que simplifica conceptos complejos de electricidad a través de gráficos intuitivos y explicaciones directas, fomentando un aprendizaje efectivo y duradero.</p>
      `,
    },
    {
      id: 14,
      title: "Partes Internas de un Equipo (Proyecto de Computación)",
      description: "Proyecto educativo que explora los componentes internos esenciales de una computadora, explicando su función y cómo interactúan.",
      category: "educativos",
      isDetailView: true,
      imageSrc: "https://scontent.ftlc2-1.fna.fbcdn.net/v/t39.30808-6/472745709_122186703416139901_5376220913348583142_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHeH3prLVb95XhvXB9Tzga0Ao2Kf6VxH7gCjYp_pXEfuAIIzX45AgvbDSANZFce0U1YeHFkV9MRQ4BIRr85aXru&_nc_ohc=sEtm2-_32AQQ7kNvwGJC46m&_nc_oc=AdlMQZ8bytaWm5OpA6M-GQyw8WUYDt_BS54N_IRQ760mrMZBmeLyfXkTGDqIuHYOfkKViTejFQJYny5wVg0MjUV8&_nc_zt=23&_nc_ht=scontent.ftlc2-1.fna&_nc_gid=lVOm7i4K2E9pmSu-BqhdIA&oh=00_AfTfE9dt2O93ttpkgLdPXwowNVBHlZuXCw0NAxxbKibLTw&oe=686F7A9C",
      detailContent: `
        <p style="margin-top: 0;">Este proyecto educativo se centra en desglosar las partes internas de una computadora de escritorio, proporcionando una comprensión clara de cada componente y su rol en el funcionamiento general del sistema. Es ideal para estudiantes y entusiastas que desean conocer a fondo el hardware.</p>
        <p><strong>Componentes Clave y Aprendizaje:</strong></p>
        <ul>
          <li><strong>Placa Madre (Motherboard):</strong> Se explica como el "esqueleto" del equipo, donde se conectan todos los demás componentes.</li>
          <li><strong>Procesador (CPU):</strong> El "cerebro" de la computadora, responsable de ejecutar instrucciones y procesar datos.</li>
          <li><strong>Memoria RAM:</strong> La memoria de acceso aleatorio, esencial para el almacenamiento temporal de datos y la multitarea.</li>
          <li><strong>Disco Duro (HDD/SSD):</strong> Dispositivo de almacenamiento principal para el sistema operativo, programas y archivos.</li>
          <li><strong>Tarjeta Gráfica (GPU):</strong> Encargada de procesar y renderizar imágenes para la pantalla.</li>
          <li><strong>Fuente de Poder (PSU):</strong> Suministra energía a todos los componentes del equipo.</li>
          <li><strong>Ventiladores y Disipadores:</strong> Componentes cruciales para mantener la temperatura óptima y evitar el sobrecalentamiento.</li>
        </ul>
        <p><strong>Metodología y Beneficios:</strong></p>
        <ul>
          <li><strong>Identificación Visual:</strong> El proyecto utiliza una imagen clara y posiblemente diagramas para ayudar a los estudiantes a identificar físicamente cada parte.</li>
          <li><strong>Explicación de Función:</strong> Cada componente se acompaña de una explicación concisa de su propósito y cómo contribuye al rendimiento del equipo.</li>
          <li><strong>Interconexión:</strong> Se resalta cómo estas partes trabajan juntas para que la computadora funcione eficientemente.</li>
          <li><strong>Habilidades Prácticas:</strong> Fomenta la curiosidad por el ensamblaje y la resolución de problemas de hardware, sentando las bases para futuros estudios en informática o reparación de equipos.</li>
        </ul>
        <p>Este recurso es invaluable para cursos de computación básica, talleres de ensamblaje de PC o para cualquier persona que desee desmitificar el funcionamiento interno de su computadora.</p>
      `,
    },
    {
      id: 15,
      title: "Manualidad Estructural de Bicicleta (Proyecto de Artes)",
      description: "Proyecto práctico de arte que permite construir una réplica estructural de una bicicleta, ideal para comprender mecánica y diseño. Está hecha con palillos.",
      category: "educativos",
      isDetailView: true,
      imageSrc: "https://scontent.ftlc2-1.fna.fbcdn.net/v/t39.30808-6/472897069_122186852900139901_3206957745660072906_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFvU6HB9hyIVzdHjb96ByC-mMSA2o3bbZ-YxIDajdttn_nGmwBmQaL2jGZbUWZcHW3TpDgWxrIycAO_pmfIR9T1&_nc_ohc=adqtZbmBT_IQ7kNvwFZhsRA&_nc_oc=AdnjT0bgRDREgdn4tpPH_yHPFu6tFL16ngl3qD7oGGWiuLNBTeRd9R6Co3HWdF54EX42vMVW2Z1wtBnWo6Pr1jM&_nc_zt=23&_nc_ht=scontent.ftlc2-1.fna&_nc_gid=PFzeSWw7Pc847x4KGA_V9w&oh=00_AfRr30ZQIE-8ww6qdNp2EIyuDRWbjO_1L6aXxM0aWe-MXg&oe=686F71C6",
      detailContent: `
        <p style="margin-top: 0;">Este proyecto combina el arte y la educación para crear una manualidad estructural de una bicicleta. Es una actividad ideal para desarrollar habilidades motrices finas, comprensión espacial y conocimientos básicos sobre la mecánica y el diseño de objetos cotidianos. Está hecha con palillos.</p>
        <p><strong>Objetivos y Proceso de Creación:</strong></p>
        <ul>
          <li><strong>Comprensión Estructural:</strong> Los participantes aprenden sobre las diferentes partes de una bicicleta (cuadro, ruedas, manillar, pedales) y cómo se conectan para formar una estructura funcional.</li>
          <li><strong>Habilidades Manuales:</strong> Fomenta la destreza manual, la precisión en el corte y la unión de materiales, y el seguimiento de instrucciones para ensamblar un objeto tridimensional.</li>
          <li><strong>Creatividad y Personalización:</strong> Aunque se basa en una estructura real, el proyecto permite la personalización en colores, materiales y pequeños detalles, incentivando la expresión artística.</li>
          <li><strong>Materiales Utilizados:</strong> Se emplean materiales sencillos y accesibles como cartón, palitos de madera, alambre, pegamento, pinturas y otros elementos decorativos.</li>
          <li><strong>Aplicación Educativa:</strong> Es una excelente herramienta para enseñar conceptos de ingeniería básica, física (equilibrio, movimiento), y diseño industrial de una manera práctica y divertida.</li>
        </ul>
        <p>El resultado es una réplica de bicicleta hecha a mano que no solo es un objeto decorativo, sino también una evidencia tangible del aprendizaje y la aplicación de principios de diseño y construcción.</p>
      `,
    },
  ];

  // Manual reordering to alternate between 'marketing' and 'educativos'
  const reorderedProjects = [];
  const marketingProjects = projects.filter(p => p.category === 'marketing');
  const educativosProjects = projects.filter(p => p.category === 'educativos');

  let mIndex = 0;
  let eIndex = 0;

  while (mIndex < marketingProjects.length || eIndex < educativosProjects.length) {
    if (mIndex < marketingProjects.length) {
      reorderedProjects.push(marketingProjects[mIndex]);
      mIndex++;
    }
    if (eIndex < educativosProjects.length) {
      reorderedProjects.push(educativosProjects[eIndex]);
      eIndex++;
    }
  }

  const filteredProjects = selectedCategory === 'all'
    ? reorderedProjects // Use the reordered list for 'all'
    : projects.filter(project => project.category === selectedCategory); // Keep original order for specific categories

  return (
    // Contenedor principal con fondo responsivo y fuente
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-inter text-gray-800">
      {/* Sección de encabezado */}
      <header className="bg-white shadow-lg py-6 px-4 sm:px-6 lg:px-8 rounded-b-xl">
        <div className="max-w-7xl mx-auto text-center">
          {/* Título principal del portafolio */}
          <p className="text-2xl md:text-3xl text-gray-600 font-bold mb-1">
            Portafolio de Evidencias
          </p>
          {/* Tamaños de fuente responsivos para el nombre */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
            Alejandro Sánchez Rogel
          </h1>
          {/* Tamaños de fuente responsivos para el título */}
          <p className="text-xl md:text-2xl text-blue-700 font-semibold">
            Licenciado en Pedagogía
          </p>

          {/* Image -  */}
          <div className="mt-6">
            <img
              src="https://i.imgur.com/Bw88FhI.png" // Marcador de posición, reemplazar con tu enlace directo real de Imgur
              alt="Foto de perfil de Alejandro Sánchez Rogel"
              className="rounded-full mx-auto shadow-md w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-blue-500"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/FF0000/FFFFFF?text=Error+Carga+Imagen"; console.warn("Error al cargar la imagen. Asegúrate de que el enlace sea directo y público."); }}
            />
          </div>
        </div>
      </header>

      {/* Barra de navegación - Orden actualizado */}
      <nav className="bg-blue-700 shadow-md py-3 mt-4 rounded-xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8">
          <a href="#sobre-mi" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300 px-3 py-1 rounded-md text-center">
            Sobre Mí
          </a>
          <a href="#proyectos" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300 px-3 py-1 rounded-md text-center">
            Proyectos
          </a>
          <a href="#contacto" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300 px-3 py-1 rounded-md text-center">
            Contacto
          </a>
        </div>
      </nav>

      {/* Área de contenido principal */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        {/* Sección Sobre Mí - Movida al principio */}
        <section id="sobre-mi" className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center border-b-2 border-blue-500 pb-3">
            Sobre Mí
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Soy licenciado en Pedagogía y actualmente imparto clases particulares de regularización a nivel primaria y secundaria, así como cursos de computación para personas de todas las edades. Mi formación pedagógica me permite adaptar mis métodos de enseñanza a las necesidades específicas de cada estudiante, promoviendo un aprendizaje significativo y personalizado.
            Además, me especializo en el armado y reparación de computadoras, así como en soluciones tecnológicas y creativas que incluyen la edición de imágenes, creación de logotipos, producción de videos, diseño de páginas web y el desarrollo de sistemas automatizados para fines tanto comerciales como personales. Mi objetivo es ofrecer soluciones integrales que combinen la educación y la tecnología de manera eficiente y accesible.
          </p>
        </section>

        {/* Sección de Proyectos - Movida debajo de Sobre Mí */}
        <section id="proyectos" className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center border-b-2 border-blue-500 pb-3">
            Mis Proyectos y Evidencias
          </h2>

          {/* Botones de filtro de categoría */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105
                ${selectedCategory === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-800'}`}
            >
              Todos los Proyectos
            </button>
            <button
              onClick={() => setSelectedCategory('educativos')}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105
                ${selectedCategory === 'educativos' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-800'}`}
            >
              Proyectos Educativos
            </button>
            <button
              onClick={() => setSelectedCategory('marketing')}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105
                ${selectedCategory === 'marketing' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-800'}`}
            >
              Proyectos de Marketing
            </button>
          </div>

          {/* Cuadrícula responsiva para las tarjetas de proyecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  category={project.category}
                  isDetailView={project.isDetailView} // Pasa la prop para el comportamiento del botón
                  onDetailClick={() => setSelectedProjectDetails(project)} // Pasa la función para abrir el modal
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-8">No hay proyectos en esta categoría aún.</p>
            )}
          </div>
        </section>

        {/* Sección de Contacto */}
        <section id="contacto" className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center border-b-2 border-blue-500 pb-3">
            Contacto
          </h2>
          <div className="flex flex-col items-center space-y-6 text-lg text-gray-700">
            {/* WhatsApp Contact */}
            <div className="flex flex-col items-center space-y-2">
              {/* Ajustado el tamaño de fuente del número de teléfono */}
              <p className="text-base md:text-xl font-semibold text-gray-800">+52 1 729 769 8981</p>
              <a
                href="https://wa.me/5217297698981" // Asumiendo código de país de México +52 y '1' para móvil
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-600 hover:text-green-800 font-medium transition-colors"
              >
                <img
                  src="https://i.imgur.com/FP31X7a.png" // Enlace directo al icono de WhatsApp
                  alt="Icono de WhatsApp"
                  className="w-6 h-6"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/00FF00/FFFFFF?text=WA"; console.warn("Error al cargar la imagen de WhatsApp."); }}
                />
                {/* Ajustado el tamaño de fuente del texto del enlace de WhatsApp */}
                <span className="text-xs md:text-base">Enviar mensaje por WhatsApp</span>
              </a>
            </div>

            {/* Email Contact - Ahora es un botón que abre un modal */}
            <div className="flex flex-col items-center space-y-2">
              {/* Ajustado el tamaño de fuente para dispositivos móviles y añadido break-all */}
              <p className="text-xs md:text-base font-semibold text-gray-800 break-all">alejandrosanchezrogel99@gmail.com</p>
              <button
                onClick={() => setShowEmailServiceModal(true)} // Abre el modal de selección de servicio de correo
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <img
                  src="https://i.imgur.com/wKDO8fK.png" // Enlace directo al icono de Correo Electrónico
                  alt="Icono de Correo Electrónico"
                  className="w-6 h-6"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/0000FF/FFFFFF?text=Email"; console.warn("Error al cargar la imagen de correo."); }}
                />
                {/* Ajustado el tamaño de fuente del texto del enlace de correo */}
                <span className="text-xs md:text-base">Enviar correo</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Sección de pie de página */}
      <footer className="bg-gray-800 text-white py-6 mt-12 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Alejandro Sánchez Rogel. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de detalles del proyecto, se renderiza condicionalmente */}
      <ProjectDetailModal
        project={selectedProjectDetails}
        onClose={() => setSelectedProjectDetails(null)}
      />

      {/* Modal de selección de servicio de correo */}
      {showEmailServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowEmailServiceModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-red-600 transition-colors"
              aria-label="Cerrar"
            >
              &times;
            </button>
            {emailServiceSelectionContent}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;