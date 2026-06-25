import { unstable_rethrow } from 'next/navigation'
import { tx } from 'gt-next/server'

export async function translateCmsText(value: string, context: string): Promise<string>
export async function translateCmsText(
  value: string | undefined,
  context: string
): Promise<string | undefined>
export async function translateCmsText(value: string | undefined, context: string) {
  if (!value?.trim()) return value

  try {
    return await tx(value, { $context: context })
  } catch (error) {
    unstable_rethrow(error)

    console.error('Translation failed:', {
      context,
      message: error instanceof Error ? error.message : String(error),
    })
    return value
  }
}
