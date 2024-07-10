import { Request, Response, NextFunction } from 'express';
import { RedirectMiddleware } from './redirect.middleware';

describe('RedirectMiddleware', () => {
  let middleware: RedirectMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    middleware = new RedirectMiddleware();
    mockRequest = { url: '' };
    mockResponse = {
      redirect: jest.fn(),
    } as Partial<Response>;
    mockNextFunction = jest.fn();
  });

  it('should redirect to /docs when URL is "/"', () => {
    mockRequest.url = '/';

    middleware.use(mockRequest as Request, mockResponse as Response, mockNextFunction);

    expect(mockResponse.redirect).toHaveBeenCalledWith('/docs');
    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('should redirect to /docs when URL is empty', () => {
    mockRequest.url = '';

    middleware.use(mockRequest as Request, mockResponse as Response, mockNextFunction);

    expect(mockResponse.redirect).toHaveBeenCalledWith('/docs');
    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('should call next() when URL is not "/" or empty', () => {
    mockRequest.url = '/other-route';

    middleware.use(mockRequest as Request, mockResponse as Response, mockNextFunction);

    expect(mockResponse.redirect).not.toHaveBeenCalled();
    expect(mockNextFunction).toHaveBeenCalled();
  });
});
