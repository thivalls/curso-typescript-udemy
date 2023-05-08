import { AddAccountRepository } from '../../../data/protocols/add-account-repository-protocol'
import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly repository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.repository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(accountData.password)
    return await this.repository.add({ ...accountData, password: encryptedPassword })
  }
}
