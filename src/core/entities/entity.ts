import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<props> {
  private _id: UniqueEntityID
  protected props: props

  get id() {
    return this._id
  }

  protected constructor(props: props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity._id === this._id) {
      return true
    }

    return false
  }
}
