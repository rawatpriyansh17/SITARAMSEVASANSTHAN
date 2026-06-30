import { tx } from 'gt-next/server'

const DEFAULT_TRANSLATION_TIMEOUT_MS = 1800
const TRANSLATION_TIMEOUT = Symbol('TRANSLATION_TIMEOUT')

export async function translateCmsText(value: string, context: string): Promise<string>
export async function translateCmsText(
  value: string | undefined,
  context: string
): Promise<string | undefined>
export async function translateCmsText(value: string | undefined, context: string) {
  if (!value?.trim()) return value

  try {
    const result = await withTranslationTimeout(
      tx(value, { $context: context }),
      getTranslationTimeoutMs()
    )

    if (result === TRANSLATION_TIMEOUT) {
      console.warn('Translation timed out, rendering English context:', {
        context,
        timeoutMs: getTranslationTimeoutMs(),
      })
      return value
    }

    return result
  } catch (error) {
    console.error('Translation failed:', {
      context,
      message: error instanceof Error ? error.message : String(error),
    })
    return value
  }
}

function getTranslationTimeoutMs() {
  const configuredTimeout = Number(process.env.GT_TRANSLATION_TIMEOUT_MS)

  return Number.isSafeInteger(configuredTimeout) && configuredTimeout > 0
    ? configuredTimeout
    : DEFAULT_TRANSLATION_TIMEOUT_MS
}

function withTranslationTimeout(
  translation: Promise<string>,
  timeoutMs: number
): Promise<string | typeof TRANSLATION_TIMEOUT> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<typeof TRANSLATION_TIMEOUT>((resolve) => {
    timeoutId = setTimeout(() => resolve(TRANSLATION_TIMEOUT), timeoutMs)
  })

  return Promise.race([translation, timeout]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })
}
