export const mockBcrypt = jest.fn()
const mockedBcrypt = jest.fn().mockImplementation(() => {
    return { compareSync: jest.fn() }
});
export default mockedBcrypt