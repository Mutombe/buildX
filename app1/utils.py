from django.http import Http404


def get_object(pk, object):
    try:
        return object.objects.get(pk=pk)
    except object.DoesNotExist:
        raise Http404
