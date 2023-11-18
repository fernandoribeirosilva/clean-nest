import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion } from '@prisma/client'

// vai pegar uma question do prisma é vai converte para a camada de domínio
export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        bestAnswerId: undefined,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
