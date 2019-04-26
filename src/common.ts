import _ from 'lodash'

export function getterFromIteratee<
  Item extends any,
  ItemKey extends keyof Item
> (iteratee: ItemKey | ((item: Item) => any)): (item: Item) => any {
  return _.isFunction(iteratee)
    ? iteratee
    : ((item: Item) => _.get(item, iteratee as ItemKey))
}
