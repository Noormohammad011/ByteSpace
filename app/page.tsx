import Container from '@/components/layout/Container'

const colors = [
  ['Lime 400', 'bg-brand-lime-400'],
  ['Lime 500', 'bg-brand-lime-500'],
  ['Violet 600', 'bg-brand-violet-600'],
  ['Violet 950', 'bg-brand-violet-950'],
  ['Blue 800', 'bg-brand-blue-800'],
  ['Gray 50', 'bg-shuttle-gray-50'],
  ['Gray 100', 'bg-shuttle-gray-100'],
  ['Gray 200', 'bg-shuttle-gray-200'],
  ['Gray 300', 'bg-shuttle-gray-300'],
  ['Gray 400', 'bg-shuttle-gray-400'],
  ['Gray 700', 'bg-shuttle-gray-700'],
  ['Gray 900', 'bg-shuttle-gray-900'],
  ['Gray 950', 'bg-shuttle-gray-950'],
  ['Black 700', 'bg-black-700'],
  ['Black 950', 'bg-black-950'],
  ['White', 'bg-neutral-white'],
] as const

const typeStyles = [
  ['Display S', 'font-heading text-display-s font-medium'],
  ['Display XS', 'font-heading text-display-xs font-medium'],
  ['Heading L', 'font-heading text-heading-l font-semibold'],
  ['Heading M', 'font-heading text-heading-m font-semibold'],
  ['Heading S', 'font-heading text-heading-s font-semibold'],
  ['Heading XS', 'font-heading text-heading-xs font-semibold'],
  ['Label XL', 'font-body text-label-xl font-medium'],
  ['Label L', 'font-body text-label-l font-medium'],
  ['Label M', 'font-body text-label-m font-medium'],
  ['Label S', 'font-body text-label-s font-medium'],
  ['Label XS', 'font-body text-label-xs font-medium'],
  ['Body L', 'font-body text-body-l font-normal'],
  ['Body M', 'font-body text-body-m font-normal'],
  ['Body S', 'font-body text-body-s font-normal'],
  ['Body XS', 'font-body text-body-xs font-normal'],
] as const

const spacingSteps = [
  4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 120,
] as const

const Home = () => {
  return (
    <Container className="flex flex-col gap-16 py-16">
      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-heading-m font-semibold">
          ByteSpace tokens
        </h1>
        <p className="max-w-full text-body-s md:text-body-m">
          Temporary sample of color, type, spacing, elevation, and container
          width. Home replaces this page later.
        </p>
      </header>

      <section className="flex flex-col gap-8">
        <h2 className="font-heading text-heading-xs font-semibold">Color</h2>
        <ul className="flex flex-wrap gap-8">
          {colors.map(([name, swatch]) => (
            <li key={name} className="flex w-24 flex-col gap-4">
              <span
                className={`h-16 w-full rounded-card border border-shuttle-gray-200 ${swatch}`}
              />
              <span className="text-label-xs font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-heading text-heading-xs font-semibold">Type</h2>
        <ul className="flex flex-col gap-8">
          {typeStyles.map(([name, style]) => (
            <li key={name} className="flex flex-col gap-4">
              <span className="text-label-xs font-medium text-shuttle-gray-400">
                {name}
              </span>
              <span className={`max-w-full break-words ${style}`}>
                The quick brown fox
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-heading text-heading-xs font-semibold">Spacing</h2>
        <ul className="flex flex-col gap-8">
          {spacingSteps.map((step) => (
            <li key={step} className="flex items-center gap-8">
              <span className="w-12 shrink-0 text-label-xs font-medium">
                {step}
              </span>
              <span
                className="h-8 max-w-full bg-brand-blue-800"
                style={{ width: step }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-heading text-heading-xs font-semibold">
          Elevation
        </h2>
        <div className="max-w-full rounded-card bg-neutral-white p-16 shadow-elevation-a">
          <p className="text-body-s md:text-body-m">elevationA</p>
        </div>
      </section>
    </Container>
  )
}

export default Home
