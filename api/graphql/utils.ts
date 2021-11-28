export const mapToModel = (entity: any) => {
    return {
        ...entity.toObject(),
        id: entity._id
    }
}