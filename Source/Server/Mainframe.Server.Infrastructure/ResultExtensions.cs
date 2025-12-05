using Mainframe.Server.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Mainframe.Server.Infrastructure;

public static class ResultExtensions
{
    public static IResult ToHttpResult<TValue>(
        this Result<TValue, Exception> result,
        ILogger logger)
    {
        return result.Match(
            Results.Ok,
            error =>
            {
                logger.LogError(error, "{Error}", error.Message);

                return error switch
                {
                    AuthenticationRequiredException => Results.Unauthorized(),
                    UnauthorizedUserException => Results.Forbid(),
                    BadRequestException => Results.BadRequest(new { error = error.Message }),
                    NotFoundException => Results.NotFound(new { error = error.Message }),
                    _ => Results.Problem(
                        "An unexpected error occurred",
                        statusCode: StatusCodes.Status500InternalServerError)
                };
            });
    }
}
