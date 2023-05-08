import { BcryptAdapter } from './bcrypt-adapter'
import bcryptjs from 'bcryptjs'

describe('Bcrypt Adapter', () => {
//   const makeEncrypterStub = (): Encrypter => {
//     class EncrypterStub implements Encrypter {
//       async encrypt (value: string): Promise<string> {
//         return await new Promise(resolve => { resolve('hashed_password') })
//       }
//     }

  //     return new EncrypterStub()
  //   }

  //   const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  //     class AddAccountRepositoryStub implements AddAccountRepository {
  //       async add (accountData: AddAccountModel): Promise<AccountModel> {
  //         const account = { ...accountData, id: 'valid_id' }
  //         return await new Promise(resolve => { resolve(account) })
  //       }
  //     }
  //     return new AddAccountRepositoryStub()
  //   }

  //   interface SutTypes {
  //     sut: DbAddAccount
  //     encrypterStub: Encrypter
  //     addAccountRepositoryStub: AddAccountRepository
  //   }
  //   const makeSut = (): SutTypes => {
  //     const encrypterStub = makeEncrypterStub()
  //     const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  //     const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  //     return {
  //       sut,
  //       encrypterStub,
  //       addAccountRepositoryStub
  //     }
  //   }

  test('Should call bcrypt with correct value', async () => {
    // Given
    const saltForTest = 12
    const sut = new BcryptAdapter(saltForTest)

    // When
    const hashSpy = jest.spyOn(bcryptjs, 'hash')
    await sut.encrypt('any_value')

    // Then
    expect(hashSpy).toHaveBeenCalledWith('any_value', saltForTest)
  })
})
