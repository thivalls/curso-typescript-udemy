import { BcryptAdapter } from './bcrypt-adapter'
import bcryptjs from 'bcryptjs'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const saltForTest = 12
    const sut = new BcryptAdapter(saltForTest)

    const hashSpy = jest.spyOn(bcryptjs, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', saltForTest)
  })

  test('Should return a valid hash when is called on success', async () => {
    const saltForTest = 12
    const sut = new BcryptAdapter(saltForTest)

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })
})
