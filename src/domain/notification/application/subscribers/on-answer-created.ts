import { DomainEvents } from '@/core/events/domain.events'
import { EventHandler } from '@/core/events/event-handler'
import { IQuestionRepository } from '@/domain/forum/application/repositories/IQuestion-repository'
import { AnswerCreateEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: IQuestionRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreateEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreateEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title
          .substring(0, 40)
          .concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}
