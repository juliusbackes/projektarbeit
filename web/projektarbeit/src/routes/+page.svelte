<script>
	import { Logo } from '$lib/icons';
	import { GithubIcon, CalendarDays, CheckCircle, Sliders, Laptop, Menu, X } from 'lucide-svelte';

	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	let features = $state([
		{
			icon: CalendarDays,
			title: 'Konfliktfreie Planung',
			description:
				'Automatisiert die Klausurenplanung so, dass keine Überschneidungen oder Konflikte zwischen Prüfungen entstehen.'
		},
		{
			icon: Sliders,
			title: 'Benutzerdefinierte Regeln',
			description:
				'Ermöglicht es, individuelle Vorgaben und Einschränkungen für die Prüfungsplanung flexibel zu konfigurieren.'
		},
		{
			icon: CheckCircle,
			title: 'Optimierte Wochenverteilung',
			description:
				'Verteilt die Prüfungen gleichmäßig über die verfügbaren Wochen, um Stress für Schüler & Lehrer zu minimieren.'
		},
		{
			icon: Laptop,
			title: 'Benutzerfreundliche Oberfläche',
			description:
				'Intuitive und klare Benutzeroberfläche, die eine einfache Navigation und schnelle Anpassungen ermöglicht.'
		}
	]);

	let steps = $state([
		{ step: 1, title: 'Daten hochladen', description: 'Laden Sie Kurs- und Schülerdaten hoch.' },
		{
			step: 2,
			title: 'Regeln definieren',
			description:
				'Legen Sie den Prüfungszeitraum fest und definieren Sie kursbezogene Regeln wie mögliche Prüfungstage.'
		},
		{
			step: 3,
			title: 'Zeitplan generieren',
			description: 'Lehnen Sie sich zurück und lassen Sie Schedulo die Arbeit machen.'
		}
	]);
</script>

<div class="flex min-h-screen flex-col">
	<main class="flex-grow">
		<Hero />
		<Features />
		<!-- <Preview /> -->
		<HowItWorks />
		<Playground />
		<AboutUs />
	</main>
</div>

{#snippet Hero()}
	<section class="relative overflow-hidden bg-emerald-50 py-20">
		<div class="absolute inset-0 opacity-10">
			<div
				class="h-full w-full bg-emerald-700"
				style="background-image: linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px); background-size: 20px 20px;"
			></div>
		</div>
		<div class="container relative z-10 mx-auto px-4 text-center">
			<h1 class="mb-4 text-4xl font-bold md:text-5xl">
				Intelligente Klausurplanung leicht gemacht
			</h1>
			<p class="mb-8 text-xl text-gray-600">
				Optimieren Sie Klausurpläne mit schnell und reduzieren Sie Terminkonflikte mühelos.
			</p>
			<a
				href="/login"
				class="rounded-md bg-emerald-700 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-600"
			>
				Jetzt starten
			</a>
		</div>
	</section>
{/snippet}

{#snippet Features()}
	<section id="features" class="py-20">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">Funktionen</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{#each features as feature, index}
					<div
						class="rounded-lg border border-emerald-700 p-6 text-center transition-shadow hover:shadow-lg"
					>
						<div class="mb-4 flex justify-center">
							<feature.icon />
						</div>
						<h3 class="mb-2 text-xl font-semibold">{feature.title}</h3>
						<p class="text-gray-600">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/snippet}

{#snippet Preview()}
	<section class="bg-emerald-50 py-20">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">Sehen Sie es in Aktion</h2>
			<div class="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-xl">
				<img
					src="/placeholder.svg?height=600&width=800"
					alt="Schedulo Oberfläche Vorschau"
					class="h-auto w-full rounded-md"
				/>
			</div>
		</div>
	</section>
{/snippet}

{#snippet HowItWorks()}
	<section id="how-it-works" class="py-20">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">Wie es funktioniert</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each steps as item}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white"
						>
							{item.step}
						</div>
						<h3 class="mb-2 text-xl font-semibold">{item.title}</h3>
						<p class="text-gray-600">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/snippet}

{#snippet Playground()}
	<section id="playground" class="bg-emerald-50 py-20">
		<div class="container mx-auto px-4 text-center">
			<h2 class="mb-6 text-3xl font-bold">Testen Sie Schedulo</h2>
			<p class="mb-8 text-xl text-gray-600">
				Probieren Sie unsere Klausurenplanungssoftware in einer interaktiven Demoumgebung aus.
			</p>
			<a
				href="/playground"
				class="rounded-md bg-emerald-700 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-600"
			>
				Zum Playground
			</a>
		</div>
	</section>
{/snippet}

{#snippet AboutUs()}
	<section id="about-us" class="relative overflow-hidden py-20">
		<div class="absolute inset-0 opacity-5">
			<div
				class="h-full w-full bg-emerald-700"
				style="background-image: linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px); background-size: 20px 20px;"
			></div>
		</div>
		<div class="container relative z-10 mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">Über uns</h2>
			<div class="mx-auto max-w-3xl">
				<p class="mb-6 text-lg text-gray-700">
					Schedulo wurde im Rahmen einer Projektarbeit in der Oberstufe an der Oberschule an der
					Ronzelenstraße in Bremen entwickelt.
				</p>
				<p class="mb-6 text-lg text-gray-700">
					Unser innovativer Ansatz basiert auf der Graphentheorie, einem leistungsstarken
					mathematischen Konzept, das es uns ermöglicht, komplexe Beziehungen und Abhängigkeiten
					effizient zu modellieren und zu lösen.
				</p>
				<p class="mb-6 text-lg text-gray-700">
					Mit Schedulo bringen wir die Kraft der Graphentheorie in die Hände von
					Bildungseinrichtungen, um faire, effiziente und stressfreie Prüfungszeitpläne zu
					erstellen.
				</p>
			</div>
		</div>
	</section>
{/snippet}
