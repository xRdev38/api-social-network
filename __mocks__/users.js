export const mockUser = jest.fn()
const mockedUser = jest.fn().mockImplementation(() => {
    return { findOne: jest.fn() }
});
export default mockedUser