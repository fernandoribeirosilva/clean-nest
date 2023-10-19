import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentsProps,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachments(
  override: Partial<QuestionAttachmentsProps> = {},
  id?: UniqueEntityID,
) {
  const questionAttachments = QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachments
}
