import './index.css'

export default function Header() {
  return (
    <section className="bg-white py-[70px] dark:bg-dark">
      <div className="mx-auto px-4 sm:container">
        <div className="border-l-[5px] border-[#967BDC] pl-5">
          <h2 className="mb-2 text-2xl font-semibold text-[#967BDC]">
            MY TIME TABLE
          </h2>
          <p className="text-sm font-medium text-body-color dark:text-dark-6">
            Maximize your productivity and manage your time effectively with
            this structured and flexible time table.
          </p>
        </div>
      </div>
    </section>
  )
}
