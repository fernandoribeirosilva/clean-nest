import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentsRepository } from '../repositories/IAnswer-comments-repository'

interface FetchAnswerCommentUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentUseCaseRequestResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: IAnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseRequestResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
