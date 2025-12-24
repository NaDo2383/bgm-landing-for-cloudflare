"use client"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import axios from "axios"

export default function SearchJobPage() {
  const t = useTranslations("search-job")

  const FormSchema = z.object({
    name: z.string().min(1, "Required"),
    age: z
      .string()
      .min(1, "Required")
      .refine((v) => /^\d{1,3}$/.test(v), "Enter a valid age"),
    education: z.string().min(1, "Required"),
    position: z.string().min(1, "Required"),
    phone: z
      .string()
      .min(1, "Required")
      .refine((v) => /^[+()\-\s\d]{6,}$/.test(v), "Enter a valid phone"),
    email: z.email("Enter a valid email"),
  })

  type FormValues = z.infer<typeof FormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(FormSchema) })

  async function onSubmit(data: FormValues) {
    try {
      await axios.post("/api/search-job", data)
      alert(t("success"))
    } catch (e) {
      console.error(e)
      alert(t("failed"))
    } finally {
      reset()
    }
  }

  const field =
    "h-14 w-full text-lg mt-2 rounded-[14px] border border-white/10 bg-[#141414] px-4 text-white placeholder:text-[#595959] outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"

  const label = "text-lg leading-none text-[#afafaf] font-medium mb-8"

  const errorMsg = "mt-1 text-[13px] text-red-400"

  return (
    <>
      <section className='relative min-h-[400px] flex items-center justify-center flex-col overflow-hidden '>
        <div className='relative z-10 text-start max-w-[1440px] w-full px-4 sm:px-6 lg:px-[100px] bg-[url("/about-us-hero.png")] bg-contain bg-no-repeat bg-center'>
          <div className=' flex flex-col items-center justify-center mt-24'>
            <h2 className='text-[40px] md:text-[62px] font-xwide bg-[linear-gradient(92.65deg,#FFFFFF_17.06%,#999999_99.58%)] bg-clip-text text-transparent text-center mr-1.5 uppercase font-bold'>
              {t("title1")}
            </h2>
            <span className='font-norms-pro text-lg text-[#AFAFAF] whitespace-pre-wrap text-center'>
              {t("title2")}
            </span>
          </div>
        </div>
      </section>
      <section className='mx-auto w-full max-w-[871px] my-16'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx(
            "rounded-[28px] border border-white/10 p-6 sm:p-10",
            "bg-[radial-gradient(100%_272.26%_at_0%_0%,#232323_0%,#111111_28.6%,#111111_100%)]",
            "shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          )}>
          <div className='mb-8 sm:mb-10 whitespace-pre-wrap font-medium text-4xl font-norms-pro'>
            {t("text")}
          </div>

          {/* Grid */}
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            {/* Name */}
            <div>
              <label className={label}>
                {t("name")} <span className='text-white/30'>*</span>
              </label>
              <input
                {...register("name")}
                placeholder={t("name")}
                className={field}
                autoComplete='name'
              />
              {errors.name && <p className={errorMsg}>{errors.name.message}</p>}
            </div>

            {/* Age */}
            <div>
              <label className={label}>
                {t("age")} <span className='text-white/30'>*</span>
              </label>
              <input
                {...register("age")}
                placeholder={t("age")}
                inputMode='numeric'
                className={field}
              />
              {errors.age && <p className={errorMsg}>{errors.age.message}</p>}
            </div>

            {/* Education */}
            <div>
              <label className={label}>
                {t("edu")} <span className='text-white/30'>*</span>
              </label>
              <input
                {...register("education")}
                placeholder={t("edu")}
                className={field}
                autoComplete='organization-title'
              />
              {errors.education && <p className={errorMsg}>{errors.education.message}</p>}
            </div>

            {/* Position */}
            <div>
              <label className={label}>
                {t("pos")} <span className='text-white/30'>*</span>
              </label>
              <input
                {...register("position")}
                placeholder={t("pos")}
                className={field}
                autoComplete='organization-title'
              />
              {errors.position && <p className={errorMsg}>{errors.position.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className={label}>
                {t("phone")} <span className='text-white/30'>*</span>
              </label>
              <input
                {...register("phone")}
                placeholder={t("phone")}
                className={field}
                autoComplete='tel'
                inputMode='tel'
              />
              {errors.phone && <p className={errorMsg}>{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className={label}>
                {t("email")} <span className='text-white/30'>*</span>
              </label>
              <input
                {...register("email")}
                placeholder={t("email")}
                className={field}
                autoComplete='email'
                inputMode='email'
              />
              {errors.email && <p className={errorMsg}>{errors.email.message}</p>}
            </div>
          </div>

          {/* Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className={clsx(
              "mt-10 w-full rounded-[14px] py-4 text-[16px] font-semibold text-white",
              "bg-[linear-gradient(180deg,#E89548_0%,#E87811_98.9%)]",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_30px_rgba(0,0,0,0.4)]",
              "disabled:opacity-70 disabled:cursor-not-allowed"
            )}>
            {isSubmitting ? "Submitting..." : t("apply")}
          </button>
        </form>
      </section>
    </>
  )
}
