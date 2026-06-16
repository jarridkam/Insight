package com.insight.common;
import lombok.Getter;

@Getter
public class ApiErrorResponse
{
    private final String message;

    public ApiErrorResponse(String _message)
    {
        this.message = _message;
    }
}
